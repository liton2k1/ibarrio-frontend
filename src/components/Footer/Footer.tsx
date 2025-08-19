import Image from 'next/image';
import React from 'react';
import logo from "../../../public/logo/logo (5).png";
import Container from '../Container/Container';

const Footer = () => {
    return (
        <div>
            <div className='bg-[#DEACFF] py-20 mt-20'>
                <Container className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    <Image className='w-44' src={logo} alt='' />
                    <ul className='space-y-5'>
                        <li className='text-xl font-semibold'>Contact Us</li>
                        <li className='text-gray-600'><span className='text-black font-semibold'>Address:</span> Unit 32 Bradford Chamber Business Park New Lane </li>
                        <li className='text-gray-600'><span className='text-black font-semibold'>Email:</span> support@doorstep.app</li>
                        <li className='text-gray-600'><span className='text-black font-semibold'>Contact:</span> +44 1274 288777,+44 1274 288777 (WhatsApp)</li>
                    </ul>
                </Container>
            </div>

            <Container className="text-gray-700 py-5">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p>© 2025 Doorstep. All rights reserved.</p>
                    <div className="flex space-x-5 mt-2 md:mt-0">
                        <a href="#" className="hover:underline">Privacy</a>
                        <span>•</span>
                        <a href="#" className="hover:underline">Terms</a>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;