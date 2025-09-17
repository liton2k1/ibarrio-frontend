import CTA from '@/components/CTA/CTA';
import FAQ from '@/components/FAQ/FAQ';
import Hero from '@/components/Hero/Hero';
import Partner from '@/components/Partner/Partner';
import WorkProcess from '@/components/WorkProcess/WorkProcess';
import React from 'react';

const page = () => {
    return (
        <div>
            <Hero />
            <WorkProcess />
            <Partner />
            <CTA />
            <FAQ />
        </div>
    );
};

export default page;