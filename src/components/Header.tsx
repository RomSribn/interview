import React from 'react';
import Link from 'next/link';
import styles from 'styles/Header.module.css';

const Header: React.FC = () => (
  <div className={styles.header}>
    <ul className={styles.nav}>
      <li className={styles.nav__li}>
        <Link href="/episode">All episodes</Link>
      </li>
      <li className={styles.nav__li}>
        <Link href="/location">All locations</Link>
      </li>
    </ul>
  </div>
);

export default Header;
