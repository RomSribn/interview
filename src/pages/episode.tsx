import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEpisodes, selectEpisodeState } from 'store/slices';
import List from 'components/List';
import Search from 'components/Search';
import Pagination from 'components/Pagination';

const Episode = () => {
  const { data, info, page } = useSelector(selectEpisodeState);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getEpisodes({}));
  }, [dispatch]);

  return (
    <div>
      <Search isSelect={false} onSubmit={({ name }) => dispatch(getEpisodes({ page, name }))} type="episode" />
      <List data={data} type="episode" />
      <Pagination type={'episode'} count={Number(info?.count)} />
    </div>
  );
};

export default Episode;
