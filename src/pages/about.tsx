import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';
import Content from '../components/Content';
import Navigator from '../components/Navigator';

const AboutPage = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const handleClickNavigate = useCallback(() => {
        router.push('/');
    }, []);

    return (
        <Layout>
            <Content title={t('about.title')} />
            <hr />
            <Navigator
                href="/"
                label={t('index.title')}
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

export default AboutPage;
