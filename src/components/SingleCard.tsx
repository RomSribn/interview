import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { TType } from 'interfaces/index';
import { AppState } from 'store/store';
import { getCharacter, getLocation, getEpisode } from 'store/slices';
import CharacterInfo from 'components/List/_elements/CharacterInfo';
import EpisodeInfo from 'components/List/_elements/EpisodeInfo';
import LocationInfo from 'components/List/_elements/LocationInfo';
import styles from 'styles/SingleCard.module.css';

interface ISingleCard {
  type: TType;
}

const SingleCard: React.FC<ISingleCard> = ({ type }) => {
  const { currentElement } = useSelector((state: AppState) => state[type]);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { id } = router.query;
  const { image } = currentElement || {};

  const Info = {
    character: CharacterInfo,
    episode: EpisodeInfo,
    location: LocationInfo
  }[type];

  const getElement = useCallback(() => {
    if (!id) return;
    switch (type) {
      case 'character':
        dispatch(getCharacter(+id));
        break;
      case 'location':
        dispatch(getLocation(+id));
        break;
      case 'episode':
        dispatch(getEpisode(+id));
        break;

      default:
        break;
    }
  }, [dispatch, id, type]);

  useEffect(() => {
    getElement();
  }, [getElement]);
  console.log(currentElement);

  return (
    <div className={styles.singleCard}>
      <div className={styles.card}>
        {!!image && (
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
        {currentElement && (
          <div className={styles.info}>
            <Info {...currentElement} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCard;
