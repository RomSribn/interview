import { ILocation } from 'interfaces/index';
import React from 'react';
import styles from 'styles/LocationInfo.module.css';

const LocationInfo: React.FC<ILocation> = ({ name, type, dimension }) => (
  <div className={styles.locationInfo}>
    <div className={styles.infoSection}>
      <span className={styles.title}>{name}</span>
    </div>
    <div className={styles.infoSection}>
      <span className={styles.title}>Type:</span>
      <span className={styles.subtitle}>{type}</span>
    </div>
    <div className={styles.infoSection}>
      <span className={styles.title}>Dimension:</span>
      <span className={styles.subtitle}>{dimension}</span>
    </div>
  </div>
);

export default LocationInfo;
