import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Debug = () => {
    const { i18n, t } = useTranslation();
    const router = useRouter();
    return (
        <div className="flex flex-col">
            <h3 className="text-lg">{t('debug.title')}</h3>
            <hr className="my-1 border-0" />

            <pre className="bg-gray-600 rounded-md p-6 text-gray-50">
                {JSON.stringify(
                    {
                        language: i18n.language,
                        route: {
                            pathname: router.pathname,
                            query: router.query,
                            asPath: router.asPath,
                            locale: router.locale,
                        },
                    },
                    null,
                    2,
                )}
            </pre>
        </div>
    );
};

export default Debug;
