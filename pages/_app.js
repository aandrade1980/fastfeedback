import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';

const GlobalStyle = ({ children }) => (
  <>
    <CSSReset />
    <Global
      styles={css`
        html {
          min-width: 360px;
          scroll-behavior: smooth;
          background-color: #edf2f7;
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
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
