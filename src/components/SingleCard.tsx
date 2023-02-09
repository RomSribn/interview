import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { TType } from 'interfaces/index';
import { AppState } from 'store/store';
import { getCharacter, getLocation, getEpisode } from 'store/slices';

import styles from 'styles/SingleCard.module.css';

interface ISingleCard {
  type: TType;
}

const SingleCard: React.FC<ISingleCard> = ({ type }) => {
  const { currentElement } = useSelector((state: AppState) => state[type]);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { id } = router.query;
  const { image, name } = currentElement || {};

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

  return (
    <div className={styles.singleCard}>
      <div className={styles.card}>
        {!!image && (
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
    </div>
  );
};

export default SingleCard;
