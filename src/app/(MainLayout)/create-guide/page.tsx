import React from 'react';
import CreateGuide from './_components/CreateGuide';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Doorstep | Create Guide",
}

const page = () => {
    return (
        <div>
            <CreateGuide />
        </div>
    );
};

export default page;