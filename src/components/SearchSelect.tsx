import { useState, useRef, useEffect } from "react";

type Option = {
    value: string;
    label: string;
};

type Props = {
    options: Option[];
    placeholder?: string;
    onChange?: (value: Option | null) => void;
    value?: string | null;
};

export default function SearchSelect({ options, placeholder = "Select", onChange, value = null }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selected = options.find((opt) => opt.value === value) || null;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()) && opt.label !== ""
    );

    const handleSelect = (option: Option) => {
        setIsOpen(false);
        setSearch("");
        onChange?.(option);
    };

    return (
        <div ref={wrapperRef} className="w-80 flex flex-col gap-1">
            <input
                type="text"
                value={isOpen ? search : options.find((opt) => opt.value === value)?.label}
                onFocus={() => setIsOpen(true)}
                onChange={(e) => setSearch(e.target.value)}
                className="w-80 box-border"
                placeholder={placeholder}
            />

            {isOpen &&
                <div className="invisibleScrollbar bg-background-alt rounded absolute z-10 max-h-64 box-border p-2 mt-10 w-80 overflow-y-scroll flex flex-col items-center gap-1">
                    {filteredOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleSelect(opt)}
                            className={`m-0 text-sm cursor-pointer w-full ${selected?.value === opt.value ? "bg-select" : ""}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
}
