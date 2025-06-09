export interface Municipality {
    name: string;
    schoolCount: number;
}

export interface School {
    id: string;
    name: string;
    schoolUrl: string;
}

export async function getMunicipalities(): Promise<Municipality[]> {
    const response = await fetch(`${document.location.origin}/municipality-list.json`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const json = await response.json();

    console.assert(json?.ArrayOfmunicipalityInfo?.municipalityInfo, "Invalid response");
    return json.ArrayOfmunicipalityInfo.municipalityInfo as Municipality[];
}

export async function getSchools(municipality: string): Promise<School[]> {
    const response = await fetch(`${document.location.origin}/municipalities/${encodeURI(municipality)}.json`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const json = await response.json();

    console.assert(json?.municipality?.schools?.schoolInfo, "Invalid response");

    if (!Array.isArray(json.municipality.schools.schoolInfo))
        return [json.municipality.schools.schoolInfo as School];

    return json.municipality.schools.schoolInfo as School[];
}