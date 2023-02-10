import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Banner from 'components/Banner';

type Props = { children: JSX.Element };

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Header />
    <Banner />
    {children}
    <Footer />
  </>
);

export default Layout;
