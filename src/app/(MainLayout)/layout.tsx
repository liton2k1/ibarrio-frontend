import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default layout;