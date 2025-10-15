"use client";
import React from "react";
import Container from "../Container/Container";
import Marquee from "react-fast-marquee";
import Image from "next/image";

// Partner logos
import logo1 from "../../../public/logo/doordash.jpg"
import logo2 from "../../../public/logo/uber.png";
import logo3 from "../../../public/logo/grubhub.jpg";
import logo4 from "../../../public/logo/instacart.jpg";
import logo5 from "../../../public/logo/amazon.png";
import logo6 from "../../../public/logo/walmart.jpg";
import logo7 from "../../../public/logo/ups.jpg";
import logo8 from "../../../public/logo/fedex.png";

const Partner = () => {
    const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

    return (
        <Container className="md:mt-36 mt-20">
            <h1 className="md:text-4xl text-3xl font-bold text-center md:mb-20 mb-5">
                Works with any delivery app or service
            </h1>

            {/* Marquee for large screens */}
            <div className="hidden md:block overflow-hidden">
                <Marquee
                    gradient={false}
                    speed={30}
                    pauseOnHover={true}
                    pauseOnClick={true}
                    loop={0}
                    autoFill={true}
                >
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center mx-5"
                            style={{
                                minWidth: '200px',
                                transform: 'translateZ(0)',
                                willChange: 'transform'
                            }}
                        >
                            <Image
                                src={logo}
                                alt={`partner-logo-${index}`}
                                className="h-28 w-auto max-w-[200px] object-contain border p-3 rounded-md bg-white"
                                loading="eager"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* Grid for small screens */}
            <div className="grid grid-cols-4 gap-2 place-items-center md:hidden">
                {logos.map((logo, index) => (
                    <div key={index} className="flex items-center justify-center">
                        <Image
                            src={logo}
                            alt={`partner-logo-${index}`}
                            className="h-10 w-auto object-contain border p-0.5 rounded-md bg-white"
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Partner;