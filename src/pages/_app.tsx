import Head from 'next/head';
import { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

import 'antd/dist/antd';
import '../styles/global.scss';

import { BreakpointProvider } from 'src/contexts/BreakpointContext';

import { theme } from '@/utils/themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ConfigProvider locale={ptBR} theme={theme}>
        <BreakpointProvider>
          <Component {...pageProps} />
        </BreakpointProvider>
      </ConfigProvider>
    </>
  );
}

export default MyApp;
