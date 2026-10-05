"use client";

import "./Filter.scss";

interface FilterItem {
    value: string;
    label: string;
}

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
    children: FilterItem[];
}

export const Filter = ({
    value,
    onChange,
    children,
}: FilterProps) => {
    return (
        <div className="filter">
            {children.map((filter) => (
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