import React from 'react';
import { appWithTranslation } from 'next-i18next';

import '../styles/globals.css';

const SampleApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default appWithTranslation(SampleApp);
