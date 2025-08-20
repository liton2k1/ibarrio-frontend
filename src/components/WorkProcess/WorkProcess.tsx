"use client";
import React from "react";
import Container from "../Container/Container";
import { MessagesSquare, Share2, Upload } from "lucide-react";
import Image from "next/image";
import img from "../../../public/images/img (1).jpg";

const WorkProcess = () => {
    const steps = [
        {
            icon: <Upload />,
            title: "Upload Photos",
            description: "Snap or select a few shots that clearly show the path to your door.",
            stepText: "Step 1: Enter through the main gate",
        },
        {
            icon: <MessagesSquare />,
            title: "Add Short Caption",
            description: "Keep directions clear and simple for easy following.",
            stepText: "Step 2: Take elevator to 3rd floor",
        },
        {
            icon: <Share2 />,
            title: "Share Your Link",
            description: "Paste your Doorstep link into your food‑delivery or shipping service delivery instructions.",
            stepText: "Step 3: Delivery instructions field",
        },
    ];

    return (
        <Container className="mt-20">
            <h1 className="lg:text-5xl text-3xl font-bold text-center">How It Works</h1>

            {steps.map((step, index) => (
                <div
                    key={index}
                    className="border border-gray-300 rounded-md p-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-10"
                >
                    {/* Text Section */}
                    <div className="flex items-center gap-5 order-2 md:order-1">
                        <span className="bg-[#9E58CD] p-2 rounded-full text-white">
                            {step.icon}
                        </span>
                        <div>
                            <h3 className="text-2xl font-semibold">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="order-1 md:order-2">
                        <Image className="h-60 object-fill rounded-md" src={img} alt="step" />
                        <p className="font-semibold mt-3">{step.stepText}</p>
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default WorkProcess;
