import { BAKALARI_MUNICIPALITY_API_URL } from "../definitions.ts";

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
    const response = await fetch(BAKALARI_MUNICIPALITY_API_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    return await response.json();
}

export async function getSchools(municipality: string): Promise<School[]> {
    const response = await fetch(`${BAKALARI_MUNICIPALITY_API_URL}/${encodeURI(municipality)}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    return await response.json();
}