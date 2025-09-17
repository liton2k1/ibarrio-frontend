import React from 'react';
import Container from '../Container/Container';
import Image from 'next/image';
import logo from "../../../public/logo/doorstep.png";
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='border-b border-gray-300 py-7'>
            <Container>
                <Link href="/">
                    <Image className='md:w-44 w-32 mx-auto' src={logo} alt='' />
                </Link>
            </Container>
        </div>
    );
};

export default Navbar;