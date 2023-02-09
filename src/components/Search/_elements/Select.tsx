import React from 'react';
import { TType } from 'interfaces/index';
import styles from 'styles/Search.module.css';

interface ISelect {
  onChange: (value: TType) => void;
  value: TType;
}

const Select: React.FC<ISelect> = ({ onChange, value }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value: any = event.target.value;
    onChange(value);
  };

  return (
    <select className={styles.select} onChange={handleOnChange} value={value}>
      <option value={'character'}>Characters</option>
      <option value={'location'}>Locations</option>
      <option value={'episode'}>Episodes</option>
    </select>
  );
};

export default Select;
