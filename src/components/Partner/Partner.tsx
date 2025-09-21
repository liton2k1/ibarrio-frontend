"use client";
import React from "react";
import Container from "../Container/Container";
import Marquee from "react-fast-marquee";
import Image from "next/image";

// Partner logos
import logo1 from "../../../public/logo/logo (1).png"
import logo2 from "../../../public/logo/logo (2).jpg";
import logo3 from "../../../public/logo/logo (3).jpg";
import logo4 from "../../../public/logo/logo (4).jpg";
import logo5 from "../../../public/logo/logo (5).png";
import logo6 from "../../../public/logo/logo (6).png";
import logo7 from "../../../public/logo/logo (7).jpg";
import logo8 from "../../../public/logo/logo (8).png";

const Partner = () => {
    const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8,];

    return (
        <Container className="md:mt-36 mt-20">
            <h1 className="md:text-4xl text-3xl font-bold text-center md:mb-20 mb-5">
                Works everywhere you get deliveries
            </h1>

            {/* Marquee for large screens */}
            <div className="hidden md:block">
                <Marquee gradient={false} speed={50} pauseOnHover>
                    {logos.map((logo, index) => (
                        <div key={index} className="flex items-center mx-5">
                            <Image
                                src={logo}
                                alt={`partner-logo-${index}`}
                                className="h-28 w-auto object-contain transition duration-300 border p-2 rounded-md"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* Grid for small screens */}
            <div className="grid grid-cols-4 gap-3 place-items-center md:hidden">
                {logos.map((logo, index) => (
                    <div key={index} className="flex items-center justify-center">
                        <Image
                            src={logo}
                            alt={`partner-logo-${index}`}
                            className="h-10 w-auto object-contain transition duration-300 border p-2 rounded-md"
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Partner;
