/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";
import { Edit } from "lucide-react";
import UpdateGuideModal from "@/components/UpdateGuideModal/UpdateGuideModal";

interface Step {
    instruction: string;
    caption: string;
    photo?: string;
    title?: string;
    liveUrl?: string;
    description?: string;
}

interface Guide {
    id?: number;
    title: string;
    liveUrl: string;
    description: string;
    steps: Step[];
}

const guides: Guide[] = [
    {
        id: 1,
        title: "XTZ Home Direction",
        liveUrl: "https://maps.app.goo.gl/BYU23RFg4QJRTBQr5",
        description:
            "Follow this simple visual route to reach the correct door with no confusion. This step-by-step guide ensures you’ll find the way easily.",
        steps: [
            {
                caption: "Caption",
                instruction: "Follow this simple visual route to reach the correct door with no confusion. This step-by-step guide ensures you’ll find the way easily.",
                photo: "/images/img (1).jpg",
            },
            {
                caption: "Caption",
                instruction: "Follow this simple visual route to reach the correct door with no confusion. This step-by-step guide ensures you’ll find the way easily.",
                photo: "/images/img (2).jpg",
            },
            {
                caption: "Caption",
                instruction: "Follow this simple visual route to reach the correct door with no confusion. This step-by-step guide ensures you’ll find the way easily.",
                photo: "/images/img (3).jpg",
            },
        ],
    },
    {
        id: 2,
        title: "Office Path",
        liveUrl: "https://maps.app.goo.gl/BYU23RFg4QJRTBQr5",
        description: "Use the side entrance and follow the path to the second floor.",
        steps: [
            {
                caption: "Caption",
                instruction: "Enter the side gate",
                photo: "/images/img (1).jpg",
            },
            {
                caption: "Caption",
                instruction: "Take the stairs to 1st floor",
                photo: "/images/img (2).jpg",
            },
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

    const [openEdit, setOpenEdit] = useState(false);

    const handleUpdateGuide = (updatedGuide: any) => {
        console.log("Updated Guide:", updatedGuide);
        // TODO: Call API to save updates
    };

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

            {/* Edit Button with Modal */}
            <div className="flex justify-end">
                <button
                    onClick={() => setOpenEdit(true)}
                    className="bg-[#9E58CD] px-6 py-3 rounded-md text-white font-semibold flex items-center gap-2 mt-5 cursor-pointer"
                >
                    Edit Guide <Edit />
                </button>
            </div>

            <UpdateGuideModal
                open={openEdit}
                onOpenChange={setOpenEdit}
                guide={{
                    ...guide,
                    steps: guide.steps.map(s => ({
                        title: guide.title,
                        liveUrl: guide.liveUrl,
                        description: guide.description,
                        ...s
                    }))
                }}
                onUpdate={handleUpdateGuide}
            />


            {/* Steps */}
            {guide.steps.map((step, index) => (
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
