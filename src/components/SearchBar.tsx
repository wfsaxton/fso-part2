import React from "react";

type Props = {
  search: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ search, handleSearchChange }: Props) => {
  return (
    <form>
      <label>
        Find Countries:
        <input type="text" value={search} onChange={handleSearchChange} />
      </label>
    </form>
  );
};

export default SearchBar;