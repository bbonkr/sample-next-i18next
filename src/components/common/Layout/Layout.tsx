import React from 'react';
import Debug from '../../Debug';
import Header from '../Header';

type MainProps = {};

const Layout = ({ children }: React.PropsWithChildren<MainProps>) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <hr />
            <Debug />
        </div>
    );
};

export default Layout;
