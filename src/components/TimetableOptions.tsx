import { useCallback, useContext } from "react";
import { GroupsContext } from "../providers/GroupsProvider.tsx";
import useTimetable from "../hooks/useTimetable.ts";
import { FiltersContext } from "../providers/FiltersProvider.tsx";
import { Link } from "react-router";

export default function TimetableOptions() {
    const { filters } = useContext(FiltersContext);
    const { setGroups, groups } = useContext(GroupsContext);
    const { data } = useTimetable(filters ?? undefined);

    const GroupOptions = useCallback(() => {
        if (data?.groups == null) return

        return (
            data.groups.filter(g => groups.find(_g => _g == g) == null).map((option) =>
                <option key={option} value={option}>
                    {option}
                </option>
            )
        )
    }, [data, groups])

    const handleGroupAdd = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const group = e.target.value;

        if (group === "select") return;

        setGroups([...groups, group]);
        e.target.value = "select";
    }, [groups, setGroups]);

    const handleGroupRemove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const group = e.currentTarget.innerText;

        setGroups(groups.filter(g => g !== group));
    }, [groups, setGroups]);

    return (
        <div className="flex items-center justify-center">
            <div className="flex h-12 gap-4 invisibleScrollbar overflow-x-scroll">
                <Link to={location.origin} className="no-underline">
                    <button className="m-0 flex items-center text-nowrap">
                        <span className="material-symbols-outlined mr-1 h-[22px]">swap_vert</span>
                        Change School
                    </button>
                </Link>
                <div className="flex py-1 items-center gap-2">
                    <p className="m-0">groups</p>
                    <select className="m-0" value="select" onChange={handleGroupAdd}>
                    <option value="select">select</option>
                        <GroupOptions/>
                    </select>

                    <div className="flex items-center gap-1">
                        {
                            groups.map((group) =>
                                <button className="m-0" key={group} onClick={handleGroupRemove}>
                                    {group}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
