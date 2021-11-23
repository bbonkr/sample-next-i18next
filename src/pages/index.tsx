import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';
import Content from '../components/Content';
import Navigator from '../components/Navigator';

const HomePage = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const handleClickNavigate = useCallback(() => {
        router.push('/about');
    }, []);

    return (
        <Layout>
            <Content title={t('index.title')} />
            <hr />
            <Navigator
                href="/about"
                label={t('about.title')}
                onClick={handleClickNavigate}
            />
        </Layout>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default HomePage;
