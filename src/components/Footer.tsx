import React from 'react';
import { useSelector } from 'react-redux';
import { selectLocationsState, selectCharacterState, selectEpisodeState } from 'store/slices';
import { FbIcon, InstagramIcon, LinkedinIcon } from 'assets/icons';
import styles from 'styles/Footer.module.css';

const Footer: React.FC = () => {
  const location = useSelector(selectLocationsState);
  const character = useSelector(selectCharacterState);
  const episode = useSelector(selectEpisodeState);
  return (
    <div className={styles.footer}>
      <ul className={styles.info}>
        <li className={styles.info__item}>Locations: {location.info?.count}</li>
        <li className={styles.info__item}>Characters: {character.info?.count}</li>
        <li className={styles.info__item}>Episodes: {episode.info?.count}</li>
      </ul>
      <ul className={styles.social}>
        <li className={styles.socialIcon}>
          <FbIcon />
        </li>
        <li className={styles.socialIcon}>
          <InstagramIcon />
        </li>
        <li className={styles.socialIcon}>
          <LinkedinIcon />
        </li>
      </ul>
    </div>
  );
};

export default Footer;
