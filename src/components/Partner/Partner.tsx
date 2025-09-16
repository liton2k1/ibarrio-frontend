"use client";
import React from "react";
import Container from "../Container/Container";
import Marquee from "react-fast-marquee";
import Image from "next/image";

// Partner logos
import logo1 from "../../../public/logo/logo (1).png";
import logo2 from "../../../public/logo/logo (2).png";
import logo3 from "../../../public/logo/logo (3).png";
import logo4 from "../../../public/logo/logo (4).png";
import logo6 from "../../../public/logo/logo (6).png";
import logo7 from "../../../public/logo/doordash-logo.png";
import logo8 from "../../../public/logo/walmart.svg.png";
import logo9 from "../../../public/logo/ups.png";

const Partner = () => {
    const logos = [logo1, logo2, logo3, logo4, logo6, logo7, logo8, logo9];

    return (
        <Container className="mt-20">
            <h1 className="lg:text-4xl md:text-3xl text-lg font-bold text-center md:mb-20 mb-5">
                Works everywhere you get deliveries
            </h1>

            {/* ✅ Marquee for large screens */}
            <div className="hidden lg:block">
                <Marquee gradient={false} speed={50} pauseOnHover>
                    {logos.map((logo, index) => (
                        <div key={index} className="mx-10 flex items-center">
                            <Image
                                src={logo}
                                alt={`partner-logo-${index}`}
                                className="h-10 w-auto object-contain filter grayscale transition duration-300"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* ✅ Grid for small screens */}
            <div className="grid grid-cols-4 gap-3 place-items-center lg:hidden">
                {logos.map((logo, index) => (
                    <div key={index} className="flex items-center justify-center">
                        <Image
                            src={logo}
                            alt={`partner-logo-${index}`}
                            className="h-10 w-auto object-contain filter grayscale transition duration-300"
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Partner;
