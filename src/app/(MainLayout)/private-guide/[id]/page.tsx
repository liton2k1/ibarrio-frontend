/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";
import { Edit } from "lucide-react";
import UpdateGuideModal from "@/components/UpdateGuideModal/UpdateGuideModal";
import { Step, useGetGuideByIdQuery, useUpdateGuideMutation } from "@/redux/guideApi";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

const PrivateGuide = () => {
    const { id } = useParams() as { id: string };

    const [openEdit, setOpenEdit] = useState(false);

    const { data: guide, isLoading, isError } = useGetGuideByIdQuery(id);
    const [updateGuide, { isLoading: isUpdating }] = useUpdateGuideMutation();

    if (isLoading) return <Container>Loading...</Container>;
    if (isError || !guide) return <Container>Guide not found!</Container>;

    const handleUpdateGuide = async (updatedGuide: any) => {
        try {
            await updateGuide({
                id,
                data: {
                    title: updatedGuide.title,
                    description: updatedGuide.description,
                    url: updatedGuide.liveUrl,
                    steps: updatedGuide.steps,
                },
            }).unwrap();

            toast.success("Guide updated successfully!");
        } catch (error: any) {
            console.error("Failed to update guide:", error);
            toast.error(error?.data?.message || "Failed to update guide");
        }
    };


    return (
        <Container className="mt-20">
            {/* Title + Description */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <h1 className="lg:text-5xl text-3xl font-bold mb-5">
                    {guide?.data?.title}
                </h1>
                <p className="text-gray-600 text-lg">{guide?.data?.description}</p>
            </div>

            {/* Edit Button with Modal */}
            <div className="flex justify-end">
                <button
                    onClick={() => setOpenEdit(true)}
                    disabled={isUpdating}
                    className="bg-[#9E58CD] px-6 py-3 rounded-md text-white font-semibold flex items-center gap-2 mt-5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUpdating ? "Updating..." : "Edit Guide"} <Edit />
                </button>
            </div>

            <UpdateGuideModal
                open={openEdit}
                onOpenChange={setOpenEdit}
                guide={{
                    title: guide?.data?.title,
                    liveUrl: guide?.data?.url,
                    description: guide?.data?.description,
                    steps: guide?.data?.steps || [],
                }}
                onUpdate={handleUpdateGuide}
            />

            {/* Steps */}
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

            {/* Live Location */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-5">Live Direction</h2>
                <div className="w-full h-[400px] rounded-md border border-gray-300 overflow-hidden">
                    <a
                        href={guide?.data?.url}
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

export default PrivateGuide;