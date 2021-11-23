import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type Language = {
    code: string;
    label: string;
};

const Header = () => {
    const { i18n } = useTranslation('common');
    const router = useRouter();

    const languages = useMemo(() => {
        const languages: Language[] = [
            {
                code: 'ko',
                label: '한국어',
            },
            {
                code: 'en',
                label: 'English',
            },
        ];
        return languages;
    }, []);

    const handleClickLanguage = useCallback(
        (languageCode: string) => () => {
            i18n.changeLanguage(languageCode, () => {
                const { pathname, query, asPath } = router;
                console.group('i18n.changeLanguage -> callback');
                console.info('language', languageCode);
                console.info(
                    'pathname, query, asPath',
                    pathname,
                    query,
                    asPath,
                );
                console.groupEnd();
                router.push({ pathname, query }, asPath, {
                    locale: languageCode,
                });
            });
        },
        [],
    );

    return (
        <header>
            <nav>
                <div>
                    <ul>
                        {languages.map((language) => (
                            <li key={language.code}>
                                <button
                                    onClick={handleClickLanguage(language.code)}
                                >
                                    {language.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
