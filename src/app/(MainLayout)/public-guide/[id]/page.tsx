"use client";

import React from "react";
import Container from "@/components/Container/Container";
import Image from "next/image";
import { Step, useGetGuideByIdQuery } from "@/redux/guideApi";
import { useParams } from "next/navigation";

const PublicGuide = () => {
    const { id } = useParams() as { id: string };

    const { data: guide, isLoading, isError } = useGetGuideByIdQuery(id);

    if (isLoading) return <Container>Loading...</Container>;
    if (isError || !guide) return <Container>Guide not found!</Container>;

    return (
        <Container className="mt-20">
            <div className="text-center max-w-3xl mx-auto mb-14">
                <h1 className="lg:text-5xl text-3xl font-bold mb-5">{guide?.data?.title}</h1>
                <p className="text-gray-600 text-lg">{guide?.data?.description}</p>
            </div>

            {guide?.data?.steps?.map((step: Step, index: number) => (
                <div
                    key={index}
                    className="border border-gray-300 rounded-md p-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-5"
                >
                    <div>
                        <h3 className="text-2xl font-semibold mb-3">Step {index + 1}</h3>
                        <p className="text-gray-700">{step.instruction}</p>
                    </div>
                    <div className="order-1 md:order-2">
                        {step.photo && (
                            <Image
                                className="h-60 w-full object-cover rounded-md"
                                src={step.photo}
                                alt={`Step ${index + 1}`}
                                width={600}
                                height={400}
                            />
                        )}
                        <p className="font-semibold text-gray-600 mt-1">{step.caption}</p>
                    </div>
                </div>
            ))}

            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-5">Live Direction</h2>
                <div className="w-full h-[400px] rounded-md border border-gray-300 overflow-hidden">
                    <a
                        href={guide.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4331.513417380644!2d90.44167147589732!3d23.761846588335818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8076f42fcb9%3A0x92c59481fa058655!2sMeradia%20Kacha%20Bazar!5e1!3m2!1sen!2sbd!4v1756228259401!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0, pointerEvents: "none" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </a>
                </div>
            </div>
        </Container>
    );
};

export default PublicGuide;
