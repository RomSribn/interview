import React, { useEffect } from 'react';
import { getLocations, selectLocationsState } from 'store/slices/locationsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Locations = () => {
  const { locations } = useSelector(selectLocationsState);
  const dispatch = useDispatch<any>();

  console.log(locations);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  return <div>Locations</div>;
};

export default Locations;
