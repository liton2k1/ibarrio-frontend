import React from 'react';
import Container from '../Container/Container';
import Image from 'next/image';
import logo from "../../../public/logo/logo (5).png";

const Navbar = () => {
    return (
        <div className='border-b border-gray-300 py-7'>
            <Container>
                <Image className='w-44 mx-auto' src={logo} alt='' />
            </Container>
        </div>
    );
};

export default Navbar;