import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectSearchState } from 'store/slices';
import { ICharacter, ILocation, IEpisode, TType } from 'interfaces/index';
import Card from './_elements/Card';
import styles from 'styles/List.module.css';

const List: React.FC<{ data: ICharacter[] | ILocation[] | IEpisode[]; type: TType }> = ({ data, type }) => {
  const { type: searchedType } = useSelector(selectSearchState)[type];
  const { pathname } = useRouter();
  const getCardLink = (id: number): string => `${pathname === '/' ? searchedType : pathname}/${id}`;

  return (
    <div className={styles.list}>
      {data.map((el) => (
        <Link key={el.id} href={getCardLink(el.id)}>
          {/* @ts-ignore */}
          <Card {...el} searchedType={searchedType} />
        </Link>
      ))}
    </div>
  );
};

export default List;
