import React from 'react';

type ContentProps = {
    title: string;
};

const Content = ({ title }: ContentProps) => {
    return (
        <div className="h-56 py-6 flex flex-col justify-center items-center">
            <h1 className="text-6xl">{title}</h1>
        </div>
    );
};

export default Content;
