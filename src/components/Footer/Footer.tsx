import Image from "next/image";
import React from "react";
import logo from "../../../public/logo/doorstep.png";
import Container from "../Container/Container";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#DEACFF] py-12 mt-20">
            <Container className="flex flex-col items-center text-center gap-6">
                {/* Logo */}
                <Image className="md:w-44 w-32" src={logo} alt="Doorstep logo" priority />

                {/* Links */}
                <div className="flex gap-6 text-gray-700 font-medium">
                    <Link href="/terms" className="hover:underline">
                        Terms
                    </Link>
                    <Link href="/privacy" className="hover:underline">
                        Privacy
                    </Link>
                </div>

                {/* Support */}
                <p className="text-gray-700">
                    Questions? Reach us at{" "}
                    <a
                        href="mailto:support@doorstep.app"
                        className="font-semibold text-black hover:underline"
                    >
                        support@doorstep.app
                    </a>
                </p>

                {/* Copyright */}
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} Doorstep. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;