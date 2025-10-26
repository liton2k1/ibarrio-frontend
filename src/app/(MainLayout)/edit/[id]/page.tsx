/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";
import { Edit, MapPin } from "lucide-react";
import UpdateGuideModal from "@/components/UpdateGuideModal/UpdateGuideModal";
import { Step, useGetGuideByPrivateIdQuery, useUpdateGuideMutation } from "@/redux/guideApi";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import logo from "../../../../../public/logo/doorstep.png";
import Link from "next/link"; 

const PrivateGuide = () => {
    const { id } = useParams() as { id: string };

    const [openEdit, setOpenEdit] = useState(false);

    // Updated hook to use getGuideByPrivateIdQuery
    const { data: guideResponse, isLoading, isError } = useGetGuideByPrivateIdQuery(id);
    const [updateGuide, { isLoading: isUpdating }] = useUpdateGuideMutation();

    console.log(guideResponse);

    if (isLoading) return (
        <Container className="max-w-xl mx-auto mt-20">
            <div className="text-center">Loading...</div>
        </Container>
    );

    if (isError) return (
        <Container className="max-w-xl mx-auto mt-20">
            <div className="text-center text-red-500">Guide not found!</div>
        </Container>
    );

    if (!guideResponse?.data) return (
        <Container className="max-w-xl mx-auto mt-20">
            <div className="text-center">Guide not found!</div>
        </Container>
    );

    const guideData = guideResponse.data;

    const handleUpdateGuide = async (updatedGuide: any) => {
        try {
            // Updated to use privateId instead of id
            await updateGuide({
                privateId: id, // Use privateId instead of id
                data: {
                    title: updatedGuide.title,
                    address: updatedGuide.address,
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
        <Container className="max-w-xl mx-auto mt-20">
            {/* Title + Description */}
            <div className="text-center">
                <h1 className="lg:text-5xl text-3xl font-bold mb-3">
                    {guideData.title || "Untitled Guide"}
                </h1>
                <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    {guideData.address}
                </p>
            </div>

            {/* Edit Button with Modal */}
            <div className="flex justify-center">
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
                    title: guideData.title,
                    address: guideData.address,
                    steps: (guideData.steps || []) as any,
                }}
                onUpdate={handleUpdateGuide}
            />

            {/* Steps */}
            <div className="grid grid-cols-1 gap-10 mt-10">
                {guideData.steps?.map((step: Step, index: number) => (
                    <div key={step._id || index}>
                        <div>
                            <p className="flex items-center gap-3 md:text-xl font-semibold mb-5">
                                <span className="bg-black text-white text-xl font-bold min-w-8 min-h-8 flex items-center justify-center rounded-full flex-shrink-0">
                                    {index + 1}
                                </span>
                                {step.caption}
                            </p>
                            {step.photo && (
                                <Image
                                    className="h-72 w-full rounded-md object-cover"
                                    src={step.photo}
                                    alt={`Step ${index + 1}: ${step.caption}`}
                                    width={600}
                                    height={400}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-20">
                <p className="text-center text-gray-400">Powered By</p>
                <Link href="/doorstep.app" className="flex items-center">
                    <Image className="w-24" src={logo} alt="Doorstep Logo" />
                </Link>
            </div>
        </Container>
    );
};

export default PrivateGuide;