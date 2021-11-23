import React from 'react';
import { appWithTranslation } from 'next-i18next';

const SampleApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default appWithTranslation(SampleApp);
