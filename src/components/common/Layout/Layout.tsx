import React from 'react';
import Debug from '../../Debug';
import Header from '../Header';

type MainProps = {};

const Layout = ({ children }: React.PropsWithChildren<MainProps>) => {
    return (
        <React.Fragment>
            <div>
                <Header />
                <main className="container mx-auto flex flex-col pt-3 justify-between">
                    {children}
                    <hr />
                    <Debug />
                </main>
            </div>
        </React.Fragment>
    );
};

export default Layout;
