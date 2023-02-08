import React from 'react';
import { useRouter } from 'next/router';

const Location = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return <div>Location</div>;
};

export default Location;
