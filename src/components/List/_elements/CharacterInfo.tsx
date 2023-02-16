import React from 'react';
import styles from 'styles/CharacterInfo.module.css';

const CharacterInfo: React.FC<any> = ({ name, status, species, location, origin }) => (
  <div className={styles.characterInfo}>
    <div className={styles.infoSection}>
      <span className={styles.title}>{name}</span>
      <div className={styles.subtitle}>
        <div className={styles[status]} />
        <span>
          {status} - {species}
        </span>
      </div>
    </div>
    <div className={styles.infoSection}>
      <span className={styles.title}>Last known location:</span>
      <span className={styles.subtitle}>{location?.name}</span>
    </div>
    <div className={styles.infoSection}>
      <span className={styles.title}>First seen in:</span>
      <span className={styles.subtitle}>{origin?.name}</span>
    </div>
  </div>
);

export default CharacterInfo;
