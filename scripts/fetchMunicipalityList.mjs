import fsExtra from 'fs-extra';
const { writeJson, ensureDir, remove } = fsExtra;

import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const BASE_URL = 'https://sluzby.bakalari.cz/api/v1/municipality';
const OUTPUT_DIR = './public';
const OUTPUT_FILE = `${OUTPUT_DIR}/municipality-list.json`;

(async () => {
    try {
        console.log('📥 Stahuji seznam obcí...');

        const res = await fetch(BASE_URL);
        const xml = await res.text();

        // 👇 zde upraveno
        const data = await parseStringPromise(xml, { explicitArray: false });

        await ensureDir(OUTPUT_DIR);

        await writeJson(OUTPUT_FILE, data, { spaces: 2 });

        console.log(`✅ Uloženo: ${OUTPUT_FILE}`);
    } catch (err) {
        console.error('❌ Chyba:', err.message);
    }
})();
