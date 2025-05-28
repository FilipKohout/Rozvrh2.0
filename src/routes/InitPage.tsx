import { useCallback, useState } from "react";
import useMunicipalities from "../hooks/useMunicipalities.ts";
import useSchools from "../hooks/useSchools.ts";

export default function InitPage() {
    const [municipality, setMunicipality] = useState("");
    const { data: munis, isError: mError, isLoading: mLoading, isSuccess: mSuccess } = useMunicipalities();
    const { data: schools, isError: sError, isLoading: sLoading, isSuccess: sSuccess } = useSchools(municipality);

    const MunicipalityOptions = useCallback(() => {
        return munis && (
            munis.map(option =>
                <option key={option.name} value={option.name}>
                    {option.name}
                </option>
            )
        )
    }, [munis])

    const SchoolOptions = useCallback(() => {
        return schools && (
            schools.map(option =>
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            )
        )
    }, [schools])

    return (
        <>
            {mError && (<p>Error fetching municipalities</p>)}
            {mLoading && (<p>Loading municipalities</p>)}
            {munis && mSuccess && munis.length > 0 &&
                <>
                    <h1>Select Your Municipality</h1>
                    <select onChange={(e) => setMunicipality(e.target.value)}>
                        <option>select</option>
                        <MunicipalityOptions/>
                    </select>
                </>
            }
            {sError && (<p>Error fetching schools</p>)}
            {sLoading && (<p>Loading schools</p>)}
            {schools && sSuccess && schools.length > 0 &&
                <>
                    <h1>Select Your School</h1>
                    <select>
                        <option>select</option>
                        <SchoolOptions/>
                    </select>
                </>
            }
        </>
    )
}