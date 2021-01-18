import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { DefaultSeo } from 'next-seo';

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';
import SEO from 'next-seo.config';

const GlobalStyle = ({ children }) => (
  <>
    <CSSReset />
    <Global
      styles={css`
        html {
          min-width: 360px;
          scroll-behavior: smooth;
        }

        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}
    />
    {children}
  </>
);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
