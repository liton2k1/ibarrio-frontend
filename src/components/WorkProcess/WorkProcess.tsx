"use client";
import React from "react";
import Container from "../Container/Container";
import { MessagesSquare, Share2, Upload } from "lucide-react";

const WorkProcess = () => {
  const steps = [
    {
      icon: <Upload size={40} />,
      title: "Upload Photos",
      description:
        "Snap or select a few shots that clearly show the path to your door.",
    },
    {
      icon: <MessagesSquare size={40} />,
      title: "Add Short Caption",
      description: "Keep directions clear and simple for easy following.",
    },
    {
      icon: <Share2 size={40} />,
      title: "Share Your Link",
      description:
        "Paste your Doorstep link into your food-delivery or shipping service delivery instructions.",
    },
  ];

  return (
    <Container className="mt-20">
      <h1 className="lg:text-5xl text-3xl font-bold text-center">How It Works</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 border border-gray-200 rounded-md"
          >
            <span className="bg-[#9E58CD] p-5 rounded-full text-white flex items-center justify-center mb-4">
              {step.icon}
            </span>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default WorkProcess;
