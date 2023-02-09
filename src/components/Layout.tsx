import React from 'react';
import Header from 'components/Header';
import Banner from 'components/Banner';

type Props = { children: JSX.Element };

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Header />
    <Banner />
    {children}
  </>
);

export default Layout;
