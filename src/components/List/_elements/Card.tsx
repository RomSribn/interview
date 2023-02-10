import React from 'react';
import { ICharacter, ILocation, IEpisode, TType } from 'interfaces/index';
import CharacterInfo from './CharacterInfo';
import EpisodeInfo from './EpisodeInfo';
import LocationInfo from './LocationInfo';
import Image from 'next/image';
import styles from 'styles/Card.module.css';

interface ICard {
  searchedType: TType;
}

const Card: React.FC<ICard & ILocation & IEpisode & ICharacter> = (props) => {
  const { image, searchedType } = props;
  const Info = {
    character: CharacterInfo,
    episode: EpisodeInfo,
    location: LocationInfo
  }[searchedType];

  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageWrap}>
          <Image
            loader={() => image}
            src={image}
            alt="Picture of the banner"
            className={styles.image}
            width={250}
            height={50}
          />
        </div>
      )}
      <Info {...props} />
    </div>
  );
};

export default Card;
