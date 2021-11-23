import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';

const AboutPage = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const handleClickNavigate = useCallback(() => {
        router.push('/');
    }, []);

    return (
        <Layout>
            <h1>{t('about.title')}</h1>
            <hr />
            <div>
                <Link href="/">
                    <a>{t('index.title')}</a>
                </Link>
                <span> | </span>
                <button onClick={handleClickNavigate}>
                    {t('index.title')}
                </button>
            </div>
        </Layout>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default AboutPage;
