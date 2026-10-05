"use client";

import "./Filter.scss";

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
}

export const Filter = ({
    value,
    onChange,
}: FilterProps) => {
    const filters = [
        {
            value: "all",
            label: "Все",
        },
        {
            value: "groups",
            label: "Группы",
        },
        {
            value: "people",
            label: "Люди",
        },
    ];

    return (
        <div className="filter">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    type="button"
                    className={`filter__item ${
                        value === filter.value
                            ? "filter__item--active"
                            : ""
                    }`}
                    onClick={() =>
                        onChange(filter.value)
                    }
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};