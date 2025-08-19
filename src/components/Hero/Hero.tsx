import React from 'react';
import Container from '../Container/Container';
import Image from 'next/image';
import hero from "../../../public/images/hero.png";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <Container className='grid grid-cols-2 gap-10 items-center mt-20'>
            <div>
                <h1 className='text-6xl font-bold leading-tight capitalize'>Simplify deliveries to your doorstep</h1>
                <p className='text-2xl text-gray-600 capitalize mt-5'>Guide delivery drivers right to your door — clear,
                    quick, and hassle‑free</p>
                <button className='bg-[#9E58CD] px-6 py-3 rounded-md text-white font-semibold flex items-center gap-2 mt-5 cursor-pointer'>Create Your Page <ArrowRight /></button>
            </div>
            <div>
                <Image src={hero} alt='hero' />
            </div>
        </Container>
    );
};

export default Hero;