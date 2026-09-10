import { Icon } from "@/components/ui/Icon/Icon";
import "./Search.scss";

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const Search = ({ value, onChange }: SearchProps) =>  {
	return (
		<div className="search">
			<label htmlFor="search" className="search__label">
				<Icon name="search" width={16} height={16}/>
			</label>
            <input
                id="search"
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search"
                className="search__input"
            />
			<span className="search__shortcut">⌘K</span>
		</div>
	);
}