import React from 'react';
import styles from 'styles/Search.module.css';

interface ISearchInput {
  onChange: (value: string) => void;
  value: string;
}
const SearchInput: React.FC<ISearchInput> = ({ onChange, value }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    onChange(value);
  };

  return (
    <input
      type="text"
      placeholder="Type to search"
      onChange={handleOnChange}
      value={value}
      className={styles.searchInput}
    />
  );
};

export default SearchInput;
