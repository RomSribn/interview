import React from 'react';
import { useRouter } from 'next/router';
import { ICharacter, ILocation, IEpisode } from 'interfaces/index';

import Image from 'next/image';
import styles from 'styles/Card.module.css';

const Card: React.FC<ICharacter | IEpisode | ILocation> = ({ name, image }) => (
  <div className={styles.card}>
    {image && (
      <Image
        loader={() => image}
        src={image}
        alt="Picture of the banner"
        className={styles.image}
        width={250}
        height={50}
      />
    )}
    <p>{name}</p>
  </div>
);

export default Card;
