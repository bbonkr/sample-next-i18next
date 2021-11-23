import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';

const HomePage = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const handleClickNavigate = useCallback(() => {
        router.push('/about');
    }, []);

    return (
        <Layout>
            <h1>{t('index.title')}</h1>
            <hr />
            <div>
                <Link href="/about">
                    <a>{t('about.title')}</a>
                </Link>
                <span> | </span>
                <button onClick={handleClickNavigate}>
                    {t('about.title')}
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

export default HomePage;
