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
import logo from "../../../../../public/logo/doorstep.png";
import Link from "next/link";

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
        <Container className="mt-20">
            {/* Title + Description */}
            <div className="text-center">
                <h1 className="lg:text-5xl text-3xl font-bold mb-3">{guide?.data?.title}</h1>
                <p className="text-gray-600 text-lg">{guide?.data?.address}</p>
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
                    title: guide?.data?.title,
                    address: guide?.data?.address,
                    steps: guide?.data?.steps || [],
                }}
                onUpdate={handleUpdateGuide}
            />

            {/* Steps */}
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

export default PrivateGuide;