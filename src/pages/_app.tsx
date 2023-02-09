import type { AppProps } from 'next/app';
import { wrapper } from 'store/store';
import Layout from 'components/Layout';
import 'styles/reset.css';
import 'styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(App);
