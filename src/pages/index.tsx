import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

const HomePage = () => {
    const { t } = useTranslation('common');
    return (
        <div>
            <h1>{t('index.title')}</h1>
            <hr />
            <div>
                <Link href="/about">
                    <a>{t('about.title')}</a>
                </Link>
            </div>
        </div>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default HomePage;
