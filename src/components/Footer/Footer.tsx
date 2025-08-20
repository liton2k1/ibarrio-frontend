import Image from 'next/image';
import React from 'react';
import logo from "../../../public/logo/logo (5).png";
import Container from '../Container/Container';

const Footer = () => {
    return (
        <div>
            <div className='bg-[#DEACFF] py-20 mt-20'>
                <Container className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    <div>
                        <Image className='w-44' src={logo} alt='' />
                        <p className='mt-5'>© 2025 Doorstep. All rights reserved.</p>
                    </div>
                    <ul className='space-y-5'>
                        <li className='text-xl font-semibold'>Contact Us</li>
                        <li className='text-gray-600'><span className='text-black font-semibold'>Address:</span> Unit 32 Bradford Chamber Business Park New Lane </li>
                        <li className='text-gray-600'><span className='text-black font-semibold'>Email:</span> support@doorstep.app</li>
                        <li className='text-gray-600'><span className='text-black font-semibold'>Contact:</span> +44 1274 288777,+44 1274 288777 (WhatsApp)</li>
                    </ul>
                </Container>
            </div>
        </div>
    );
};

export default Footer;