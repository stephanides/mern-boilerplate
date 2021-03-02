/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';

//import 'bootstrap/dist/css/bootstrap.min.css';

//import 'swiper/swiper.min.css';
//import 'swiper/components/navigation/navigation.min.css';
//import 'swiper/components/pagination/pagination.min.css';

import Style from '../app-data/shared/styles/global.style';
// Material UI support
import { ThemeProvider } from '@material-ui/core/styles';
//import theme from '../app-data/lib/util/mui/theme';

import withApollo from '../app-data/graphql/withApollo';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import theme from '../app-data/shared/design/theme';

const MyApp = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    Component,
    pageProps,
    pageTitle,
    apollo,
  } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle || 'Boilerplate'}</title>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta property="og:image" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="2200" />
        <meta property="og:image:height" content="1238" />
        <meta property="og:image:alt" content="Wellness pobyt romantika" />
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <Style />
          {/*Production: 6LcS98QZAAAAAG6FfstRw_BF7BwFknxp-e-0Ra6-*/}
          {/*Local: 6LfgFeEZAAAAAD2fNYXGUjpI_Yu1c65XODYxgoyY*/}
          <GoogleReCaptchaProvider reCaptchaKey="6LcS98QZAAAAAG6FfstRw_BF7BwFknxp-e-0Ra6-">
            <Component {...pageProps} />
          </GoogleReCaptchaProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default withApollo(MyApp as any);
