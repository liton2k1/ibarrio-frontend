"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";

const guides = [
    {
        id: 1,
        title: "XTZ Home Direction",
        liveUrl:
            "https://maps.app.goo.gl/BYU23RFg4QJRTBQr5",
        description:
            "Follow this simple visual route to reach the correct door with no confusion. This step-by-step guide ensures you’ll find the way easily.",
        steps: [
            { id: 1, caption: "Caption", instruction: "Enter through the main gate", photo: "/images/img (1).jpg" },
            { id: 2, caption: "Caption", instruction: "Walk straight and take the elevator to 2nd floor", photo: "/images/img (2).jpg" },
            { id: 3, caption: "Caption", instruction: "Turn left, find room 302 at the end", photo: "/images/img (3).jpg" },
        ],
    },
    {
        id: 2,
        title: "Office Path",
        liveUrl: "https://maps.app.goo.gl/BYU23RFg4QJRTBQr5",
        description: "Use the side entrance and follow the path to the second floor.",
        steps: [
            { id: 1, caption: "Caption", instruction: "Enter the side gate", photo: "/images/img (1).jpg" },
            { id: 2, caption: "Caption", instruction: "Take the stairs to 1st floor", photo: "/images/img (2).jpg" },
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
                <div key={step.id} className="border border-gray-300 rounded-md p-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-5">
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
                    <a
                        href={guide.liveUrl}
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

export default GuidePage;
