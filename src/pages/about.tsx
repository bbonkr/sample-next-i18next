import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

const AboutPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t('about.title')}</h1>
            <hr />
            <div>
                <Link href="/">
                    <a>{t('index.title')}</a>
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

export default AboutPage;
