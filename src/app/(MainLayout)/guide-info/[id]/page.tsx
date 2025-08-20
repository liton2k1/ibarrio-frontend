"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";
import { ArrowRight } from "lucide-react";

const guides = [
    {
        id: 1,
        title: "XTZ Home Direction",
        description:
            "Follow this simple visual route to reach the correct door with no confusion. This step-by-step guide ensures you’ll find the way easily.",
        liveUrl:
            "https://www.google.com/maps/dir/Meradia+Kacha+Bazar,+Dacca/23.7604444,90.42725/@23.7615566,90.4303804,1989m/data=!3m2!1e3!4b1!4m9!4m8!1m5!1m1!1s0x3755b8076f42fcb9:0x92c59481fa058655!2m2!1d90.4442464!2d23.7618417!1m0!3e3?entry=ttu&g_ep=EgoyMDI1MDgxOC4wIKXMDSoASAFQAw%3D%3D",
        steps: [
            { id: 1, instruction: "Enter through the main gate", photo: "/images/img (1).jpg" },
            { id: 2, instruction: "Walk straight and take the elevator to 2nd floor", photo: "/images/img (2).jpg" },
            { id: 3, instruction: "Turn left, find room 302 at the end", photo: "/images/img (3).jpg" },
        ],
    },
    {
        id: 2,
        title: "Office Path",
        description: "Use the side entrance and follow the path to the second floor.",
        liveUrl: "https://www.google.com/maps/dir/Meradia+Kacha+Bazar,+Dacca/23.7604444,90.42725/@23.7615566,90.4303804,1989m/data=!3m2!1e3!4b1!4m9!4m8!1m5!1m1!1s0x3755b8076f42fcb9:0x92c59481fa058655!2m2!1d90.4442464!2d23.7618417!1m0!3e3?entry=ttu&g_ep=EgoyMDI1MDgxOC4wIKXMDSoASAFQAw%3D%3D",
        steps: [
            { id: 1, instruction: "Enter the side gate", photo: "/images/img (1).jpg" },
            { id: 2, instruction: "Take the stairs to 1st floor", photo: "/images/img (2).jpg" },
        ],
    },
];

interface PageProps {
    params: Promise<{ id: string }>;
}

const GuidePage = ({ params }: PageProps) => {
    const resolvedParams = React.use(params);
    const guideId = Number(resolvedParams.id);
    const guide = guides.find((g) => g.id === guideId);

    if (!guide) {
        return (
            <Container className="mt-20">
                <p className="text-center text-red-500 font-medium">Guide not found!</p>
            </Container>
        );
    }

    return (
        <Container className="mt-20">
            {/* Title + Description */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <h1 className="lg:text-5xl text-3xl font-bold mb-5">{guide.title}</h1>
                <p className="text-gray-600 text-lg">{guide.description}</p>
            </div>

            {/* Steps */}
            {guide.steps.map((step, index) => (
                <div key={step.id} className="border border-gray-300 rounded-md p-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-10">
                    <div>
                        <h3 className="text-2xl font-semibold mb-3">Step {index + 1}</h3>
                        <p className="text-gray-700">{step.instruction}</p>
                    </div>
                    <div className="order-1 md:order-2">
                        <Image className="h-60 w-full object-cover rounded-md" src={step.photo} alt={`Step ${index + 1}`} width={600} height={400} />
                    </div>
                </div>
            ))}

            {/* Live Location */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-5">Live Direction</h2>
                <div className="w-full h-[400px] rounded-md border border-gray-300 overflow-hidden">
                    <iframe src={guide.liveUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                {/* <a
                    href={guide.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    Open Live Directions in Google Maps
                </a> */}
            </div>

            <div className="flex justify-end mt-10">
                <button className="bg-[#9E58CD] px-6 py-2 rounded-md text-white font-semibold flex items-center gap-2 cursor-pointer">
                    See All <ArrowRight />
                </button>
            </div>
        </Container>
    );
};

export default GuidePage;
