import React, { useState } from 'react';
import SearchInput from './_elements/SearchInput';
import Select from './_elements/Select';
import styles from 'styles/Search.module.css';
import { TType } from 'interfaces/index';

type TOnSubmitParams = { name?: string; type?: TType };

interface ISearch {
  isSelect?: boolean;
  isSearchInput?: boolean;
  onSubmit: (params: TOnSubmitParams) => void;
  type: TType;
}

const Search: React.FC<ISearch> = ({ isSelect, isSearchInput, onSubmit, type }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState<TType>(type);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ name: inputValue, type: selectValue });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      {isSelect && <Select onChange={setSelectValue} value={selectValue} />}
      {isSelect && isSearchInput && <div className={styles.stroke} />}
      {isSearchInput && <SearchInput value={inputValue} onChange={setInputValue} />}
    </form>
  );
};

Search.defaultProps = {
  isSelect: true,
  isSearchInput: true
};

export default Search;
