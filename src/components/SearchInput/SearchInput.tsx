import useDebounceCallback from "../../hooks/useDebounceCallback";
import type { InputChangeEvent } from "../../types";

interface ISearchInput {
    onChange: (arg: InputChangeEvent) => void
};

function SearchInput({ onChange }: ISearchInput) {
    const debouncedChange = useDebounceCallback((e) => onChange(e));

    return (
        <div className="search-wrapper">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8.5 14.5a6 6 0 100-12 6 6 0 000 12zM13.5 13.5l3.5 3.5" />
            </svg>
            <input
                onChange={debouncedChange}
                className="search-input"
                type="search"
                placeholder="Search users..."
            />
        </div>
    );
};

export default SearchInput;
