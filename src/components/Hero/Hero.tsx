import React from 'react';
import Container from '../Container/Container';
import Image from 'next/image';
import hero from "../../../public/images/hero.png";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    return (
        <Container className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-20'>
            <div className='order-2 md:order-1'>
                <h1 className='lg:text-6xl text-3xl font-bold leading-tight capitalize md:text-start text-center'>Works with any delivery app</h1>
                <p className='lg:text-2xl text-lg text-gray-600 capitalize mt-5 md:text-start text-center'>Guide delivery drivers right to your door — clear,
                    quick, and hassle‑free</p>
                <div className="flex md:justify-start justify-center">
                    <div className="w-fit">
                        <Link href="/create-guide">
                            <button className="bg-[#9E58CD] px-6 py-3 rounded-md text-white font-semibold flex items-center gap-2 mt-5 cursor-pointer">
                                Create Your Doorstep Page <ArrowRight />
                            </button>
                        </Link>
                        <p className="text-gray-500 mt-5 text-center">Free - no account required</p>
                    </div>
                </div>

            </div>
            <div className='order-1 md:order-2'>
                <Image src={hero} alt='hero' />
            </div>
        </Container>
    );
};

export default Hero;