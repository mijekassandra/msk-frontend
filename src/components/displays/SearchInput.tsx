import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FormControl, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
    placeholder?: string;
    onSearch: (searchQuery: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = "Search",
    onSearch,
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && onSearch) {
            onSearch(searchQuery);
        }
    };

    return (
        <FormControl
            fullWidth
            sx={{
                m: 1,
                width: 380,
                minWidth: {
                    sm: 300,
                    xs: "100%",
                },
            }}
            variant="standard"
        >
            <Input
                id="search-input"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: "20px" }} />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default SearchInput;
