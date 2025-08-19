"use client";
import React from "react";
import Container from "../Container/Container";
import Marquee from "react-fast-marquee";
import Image from "next/image";

// Example partner logos (you can replace with your own)
import logo1 from "../../../public/logo/logo (1).png";
import logo2 from "../../../public/logo/logo (2).png";
import logo3 from "../../../public/logo/logo (3).png";
import logo4 from "../../../public/logo/logo (4).png";
import logo5 from "../../../public/logo/logo (5).png";
import logo6 from "../../../public/logo/logo (6).png";

const Partner = () => {
    const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

    return (
        <div className="mt-20">
            <h1 className="lg:text-4xl text-3xl font-bold text-center">
                Works everywhere you get deliveries
            </h1>
            <div className="bg-gradient-to-t from-[#9E58CD6B] to-[#F9F9FF00] py-10">
                <Container className="mt-20">
                    <Marquee gradient={false} speed={50} pauseOnHover>
                        {logos.map((logo, index) => (
                            <div key={index} className="mx-10 flex items-center border-t border-b py-3">
                                <Image
                                    src={logo}
                                    alt={`partner-logo-${index}`}
                                    className="h-10 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </Marquee>
                </Container>
            </div>
        </div>
    );
};

export default Partner;
