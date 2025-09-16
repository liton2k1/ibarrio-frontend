"use client";

import React from "react";
import Container from "@/components/Container/Container";
import Image from "next/image";
import { Step, useGetGuideByIdQuery } from "@/redux/guideApi";
import { useParams } from "next/navigation";
import logo from "../../../../../public/logo/doorstep.png";
import Link from "next/link";

const PublicGuide = () => {
    const { id } = useParams() as { id: string };

    const { data: guide, isLoading, isError } = useGetGuideByIdQuery(id);

    if (isLoading) return <Container>Loading...</Container>;
    if (isError || !guide) return <Container>Guide not found!</Container>;

    return (
        <Container className="mt-20">
            <div className="text-center">
                <h1 className="lg:text-5xl text-3xl font-bold mb-3">{guide?.data?.title}</h1>
                <p className="text-gray-600 text-lg">{guide?.data?.address}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                {guide?.data?.steps?.map((step: Step, index: number) => (
                    <div
                        key={index}
                    >
                        <div>
                            <p className="flex items-center gap-3 md:text-xl font-semibold mb-5">
                                <span className="bg-black text-white text-xl font-bold min-w-8 min-h-8 flex items-center justify-center rounded-full flex-shrink-0">
                                    {index + 1}
                                </span>
                                {step.caption}
                            </p>
                            {step.photo && (
                                <Image
                                    className="h-60 w-full object-cover rounded-md"
                                    src={step.photo}
                                    alt={`Step ${index + 1}`}
                                    width={600}
                                    height={400}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-10">
                <p className="text-center text-gray-400">Powered By</p>
                <Link href="/" className="flex items-center">
                    <Image className="w-28" src={logo} alt="Doorstep Logo" />
                </Link>
            </div>
        </Container>
    );
};

export default PublicGuide;
