import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters, getEpisodes, getLocations, selectSearchState, getSearchItems } from 'store/slices';
import { setCharacterType } from 'store/slices/searchSlice';
import List from 'components/List';
import Search from 'components/Search';
import Pagination from 'components/Pagination';
import { AppState } from 'store/store';

const Home = () => {
  const { name: selectedName, type: selectedType, page, info } = useSelector(selectSearchState)?.character;
  const { data } = useSelector((state: AppState) => state[selectedType]);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    // init fetching data
    dispatch(getCharacters({}));
    dispatch(getEpisodes({}));
    dispatch(getLocations({}));
    dispatch(getSearchItems({ type: selectedType, page, name: selectedName }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  debugger;
  return (
    <div>
      <Search
        onSubmit={({ name = '', type = 'character' }) => {
          dispatch(getSearchItems({ name, type, page }));
          dispatch(setCharacterType(type));
        }}
        type={selectedType}
      />
      <List data={data} type="episode" />
      <Pagination type={selectedType} count={Number(info?.count)} />
    </div>
  );
};

export default Home;
