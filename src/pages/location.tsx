import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, selectLocationsState } from 'store/slices';
import List from 'components/List';
import Search from 'components/Search';
import Pagination from 'components/Pagination';

const Episode = () => {
  const { data, info, page } = useSelector(selectLocationsState);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getLocations({}));
  }, [dispatch]);

  return (
    <div>
      <Search isSelect={false} onSubmit={({ name }) => dispatch(getLocations({ page, name }))} type="location" />
      <List data={data} type="location" />
      <Pagination type="location" count={Number(info?.count)} />
    </div>
  );
};

export default Episode;
