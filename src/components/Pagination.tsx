import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { TType } from 'interfaces/index';
import { getCharacters, getEpisodes, getLocations, getSearchItems, selectSearchState } from 'store/slices';
import { setPage as setCharactersPage } from 'store/slices/characterSlice';
import { setPage as setLocationsPage } from 'store/slices/locationSlice';
import { setPage as setEpisodesPage } from 'store/slices/episodeSlice';
import styles from 'styles/Pagination.module.css';

interface IPaginatedItems {
  type: TType;
  count: number;
}

const PaginatedItems: React.FC<IPaginatedItems> = ({ type, count }) => {
  const { name } = useSelector(selectSearchState)[type];
  const dispatch = useDispatch<any>();

  const itemsPerPage = 20;
  const pageCount = Math.ceil(Number(count) / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected + 1;

    if (name) {
      dispatch(getSearchItems({ name, type, page: event.selected }));
    }
    if (type === 'character') {
      dispatch(getCharacters({ page }));
      dispatch(setCharactersPage(page));
    }
    if (type === 'location') {
      dispatch(getLocations({ page }));
      dispatch(setLocationsPage(page));
    }
    if (type === 'episode') {
      dispatch(getEpisodes({ page }));
      dispatch(setEpisodesPage(page));
    }
  };

  return (
    <ReactPaginate
      className={styles.paginationContainer}
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={() => null}
    />
  );
};

export default PaginatedItems;
