import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type NavigatorProps = {
    href: string;
    label: string;
    onClick?: () => void;
};

const Navigator = ({ href, label, onClick }: NavigatorProps) => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-center items-start p-3">
            <div className="flex flex-col px-3">
                <label className="text-sm mb-1">{t('navigator.link')}</label>
                <Link href={href}>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
                        {label}
                    </a>
                </Link>
            </div>
            <div className="flex flex-col px-3">
                <label className="text-sm mb-1">{t('navigator.router')}</label>
                <button
                    onClick={onClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {label}
                </button>
            </div>
        </div>
    );
};

export default Navigator;
