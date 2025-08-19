import GuideList from '@/components/GuideList/GuideList';
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
            <GuideList />
        </div>
    );
};

export default page;