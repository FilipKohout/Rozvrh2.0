import fsExtra from 'fs-extra';
const { writeJson, ensureDir, remove } = fsExtra;

import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';
import { XMLParser } from 'fast-xml-parser';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const BASE_URL = 'https://sluzby.bakalari.cz/api/v1/municipality';

const OUTPUT_DIR = './public/municipalities';

const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
    isArray: () => false,
});

(async () => {
    try {
        console.log('📥 Stahuji seznam obcí...');
        const res = await fetch(BASE_URL);
        const xml = await res.text();
        const data = await parseStringPromise(xml);

        const rawItems = data.ArrayOfmunicipalityInfo?.municipalityInfo || [];
        const names = rawItems
            .map(info => info.name?.[0]?.trim())
            .filter(Boolean);

        console.log(`🔍 Nalezeno ${names.length} obcí.`);

        // 🧹 Smazat složku pokud existuje a vytvořit znovu
        await remove(OUTPUT_DIR);
        await ensureDir(OUTPUT_DIR);

        for (const [index, name] of names.entries()) {
            const encoded = encodeURIComponent(name);
            const detailUrl = `${BASE_URL}/${encoded}`;

            try {
                const detailRes = await fetch(detailUrl);
                const detailXml = await detailRes.text();

                const jsonObj = xmlParser.parse(detailXml);
                const safeName = name.replace(/[\/\\:*?"<>|]/g, '_');

                await writeJson(`${OUTPUT_DIR}/${safeName}.json`, jsonObj, { spaces: 2 });
                console.log(`(${index + 1}/${names.length}) ✅ Uloženo: ${safeName}.json`);
            } catch (err) {
                console.error(`(${index + 1}/${names.length}) ❌ Chyba u "${name}":`, err.message);
            }

            await delay(200); // ochrana proti přílišnému zatížení serveru
        }

        console.log('\n🏁 Hotovo.');
    } catch (err) {
        console.error('❌ Kritická chyba:', err.message);
    }
})();
