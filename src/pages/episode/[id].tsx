import React from 'react';
import { useRouter } from 'next/router';

const Episode = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return <div>Episode</div>;
};

export default Episode;
