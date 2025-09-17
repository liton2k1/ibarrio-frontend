import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CTA = () => {
    return (
        <div className='bg-[#DEACFF] py-20 mt-20'>
            <div className='lg:w-5xl mx-auto md:px-0 px-5'>
                <h1 className='md:text-5xl text-3xl text-center capitalize leading-tight'>Ready to make your doorstep easier
                    to find?</h1>
                <p className='text-center md:text-2xl text-lg text-gray-600 mt-5 capitalize'>Create a visual guide in minutes — no sign‑up required.</p>
                <Link href={"/create-guide"}>
                    <button className='border border-black px-6 py-3 rounded-md font-semibold flex items-center gap-2 mt-5 cursor-pointer mx-auto'>Create Your Doorstep Page <ArrowRight /></button>
                </Link>
            </div>
        </div>
    );
};

export default CTA;