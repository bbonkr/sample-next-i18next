import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Debug = () => {
    const { i18n } = useTranslation();
    const router = useRouter();
    return (
        <div>
            <h3>Debug</h3>

            <pre>
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
