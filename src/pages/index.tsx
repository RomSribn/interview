import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters, getEpisodes, getLocations, selectSearchState, getSearchItems } from 'store/slices';
import { setCharacterName, setEpisodeName, setLocationName, setCharacterType } from 'store/slices/searchSlice';
import List from 'components/List';
import Search, { TOnSubmitParams } from 'components/Search';
import Pagination from 'components/Pagination';

const Home = () => {
  const { name, type, page, info, data } = useSelector(selectSearchState)?.character;
  const dispatch = useDispatch<any>();

  const setNameHandler = {
    character: setCharacterName,
    episode: setEpisodeName,
    location: setLocationName
  };

  const handleSearch = ({ name = '', type = 'character' }: TOnSubmitParams) => {
    dispatch(getSearchItems({ name, type, page }));
    dispatch(setCharacterType(type));
    dispatch(setNameHandler[type](name));
  };

  useEffect(() => {
    // init fetching data
    dispatch(getCharacters({}));
    dispatch(getEpisodes({}));
    dispatch(getLocations({}));
    dispatch(getSearchItems({ type, page, name }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Search onSubmit={handleSearch} type={type} />
      <List data={data} type={type} />
      <Pagination type={type} count={Number(info?.count)} />
    </div>
  );
};

export default Home;
