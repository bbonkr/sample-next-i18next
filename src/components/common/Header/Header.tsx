import React, { useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';

type Language = {
    code: string;
    label: string;
};

const Header = () => {
    const { i18n, t } = useTranslation('common');
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
            {
                code: 'ru',
                label: 'русский',
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
        <header className="bg-gray-800 ">
            <nav className="container mx-auto flex justify-between px-6 py-3">
                <div className="flex justify-start items-center">
                    <p className="text-lg text-gray-300 shadow-sm">
                        <Link href="/">
                            <a>{t('global.title')}</a>
                        </Link>
                    </p>
                </div>
                <div className="flex items-center justify-start">
                    <ul className="flex list-none mr-3">
                        {languages.map((language) => {
                            const disalbed = language.code === i18n.language;
                            return (
                                <li key={language.code} className="px-1">
                                    <button
                                        className={`bg-blue-500 ${
                                            disalbed ? '' : 'hover:bg-blue-700'
                                        } text-white font-bold py-2 px-4 rounded disabled:opacity-60`}
                                        onClick={handleClickLanguage(
                                            language.code,
                                        )}
                                        disabled={disalbed}
                                    >
                                        {language.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex justify-start items-center">
                        <a
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-center"
                            href="https://github.com/bbonkr/sample-next-i18next"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
