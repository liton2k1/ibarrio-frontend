"use client";
import React from "react";
import Image from "next/image";
import img from "../../../../public/images/img (1).jpg";
import Container from "@/components/Container/Container";
import { ArrowRight } from "lucide-react";

const WorkProcess = () => {
    const steps = [
        {
            title: "Enter through the main gate",
            description:
                "Creating a clear, step-by-step guide helps people follow a process without confusion. Whether it’s for setting up a product, completing a task, or giving directions, a well-structured.guide ensures every step is easy to understand and follow. In this guide, we’ll walk you through how to design effective steps—from choosing the right sequence to adding helpful visuals and captions—so your audience can achieve the desired outcome with confidence.",
            stepText: "Step 1: Enter through the main gate",
        },
        {
            title: "Add Short Caption",
            description:
                "Creating a clear, step-by-step guide helps people follow a process without confusion. Whether it’s for setting up a product, completing a task, or giving directions, a well-structured.guide ensures every step is easy to understand and follow. In this guide, we’ll walk you through how to design effective steps—from choosing the right sequence to adding helpful visuals and captions—so your audience can achieve the desired outcome with confidence.",
            stepText: "Step 2: Take elevator to 2nd floor",
        },
        {
            title: "Share Your Link",
            description:
                "Creating a clear, step-by-step guide helps people follow a process without confusion. Whether it’s for setting up a product, completing a task, or giving directions, a well-structured.guide ensures every step is easy to understand and follow. In this guide, we’ll walk you through how to design effective steps—from choosing the right sequence to adding helpful visuals and captions—so your audience can achieve the desired outcome with confidence.",
            stepText: "Step 3: Take elevator to 3rd floor",
        },
    ];

    return (
        <Container className="mt-20">
            {/* Title */}
            <h1 className="lg:text-5xl text-3xl font-bold text-center">How It Works</h1>

            {/* Steps */}
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="border border-gray-300 rounded-md p-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-10"
                >
                    {/* Text Section */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-5">{step.title}</h3>
                        <p className="text-gray-600 text-justify">{step.description}</p>
                    </div>

                    {/* Image Section */}
                    <div className="order-1 md:order-2">
                        <Image
                            className="h-60 w-full object-cover rounded-md"
                            src={img}
                            alt="step"
                        />
                        <p className="font-semibold mt-3">{step.stepText}</p>
                    </div>
                </div>

            ))}

            <div className="flex justify-end">
                <button className='bg-[#9E58CD] px-6 py-2 rounded-md text-white font-semibold flex items-center gap-2 mt-5 cursor-pointer'>See All <ArrowRight /></button>
            </div>

            {/* Google Map Section */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-5">Live Direction</h2>
                <div className="w-full h-[400px] rounded-md border border-gray-300 overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902431814927!2d90.39119487445618!3d23.750885889065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf52b30a6f6b%3A0x5a1f7b5d1c9982a3!2sDhaka!5e0!3m2!1sen!2sbd!4v1692209091765!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </Container>
    );
};

export default WorkProcess;
