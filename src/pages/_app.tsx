import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from 'store/store';
import Header from 'components/Header';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
