import React from 'react';
import styles from 'styles/EpisodeInfo.module.css';

const EpisodeInfo: React.FC<any> = ({ name, air_date, episode }) => (
  <div className={styles.episodeInfo}>
    <div className={styles.infoSection}>
      <span className={styles.title}>{name}</span>
    </div>
    <div className={styles.infoSection}>
      <span className={styles.title}>Air Date:</span>
      <span className={styles.subtitle}>{air_date}</span>
    </div>
    <div className={styles.infoSection}>
      <span className={styles.title}>Episode:</span>
      <span className={styles.subtitle}>{episode}</span>
    </div>
  </div>
);

export default EpisodeInfo;
