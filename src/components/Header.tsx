import React from 'react';
import styles from 'styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <ul className={styles.nav}>
        <li className={styles.nav__li}>All episodes</li>
        <li className={styles.nav__li}>All locations</li>
      </ul>
    </div>
  );
};

export default Header;
