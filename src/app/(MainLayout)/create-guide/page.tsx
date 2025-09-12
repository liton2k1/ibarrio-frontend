/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Textarea } from "@/components/ui/textarea";
import { Navigation, Trash, Copy } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import facebook from "../../../../public/logo/facebook.png";
import messenger from "../../../../public/logo/messenger.png";
import whatsApp from "../../../../public/logo/social.png";
import email from "../../../../public/logo/mail.png";
import Image from "next/image";
import { useCreateGuideMutation } from "@/redux/guideApi";
import toast from "react-hot-toast";

interface Step {
    caption: string;
    instruction: string;
    photo?: File | null;
}

const CreateGuide = () => {
    const [createGuide, { isLoading }] = useCreateGuideMutation();

    const [title, setTitle] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [steps, setSteps] = useState<Step[]>([
        { caption: "", instruction: "", photo: null },
    ]);

    const [openShareModal, setOpenShareModal] = useState(false);
    const [guideId, setGuideId] = useState<string | null>(null);

    const handleAddStep = () => {
        setSteps([...steps, { caption: "", instruction: "", photo: null }]);
    };

    const handleRemoveStep = (index: number) => {
        if (steps.length === 1) return;
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleStepChange = (index: number, field: string, value: any) => {
        setSteps(
            steps.map((step, i) => (i === index ? { ...step, [field]: value } : step))
        );
    };

    // Handle Live Location Button
    const handleLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    window.open(googleMapsUrl, "_blank");
                },
                (error) => {
                    alert("Unable to retrieve your location. Please enable location access.");
                    console.error(error);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    // Copy to clipboard helper
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    // Handle Submit Guide (API)
    // Handle Submit Guide (API)
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                title,
                url: link,
                description,
                steps: steps.map((step) => ({
                    caption: step.caption,
                    instruction: step.instruction,
                })),
            })
        );

        steps.forEach((step) => {
            if (step.photo) formData.append("file", step.photo);
        });

        try {
            const res = await createGuide(formData).unwrap();
            console.log("Guide created:", res);

            // ✅ Save the correct guideId
            setGuideId(res?.data?._id);

            toast.success("Guide created successfully!");
            setOpenShareModal(true);
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to create guide");
        }
    };


    // Build Share Links
    const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

    const privateUrl = guideId ? `${baseUrl}/private-guide/${guideId}` : "";
    const publicUrl = guideId ? `${baseUrl}/public-guide/${guideId}` : "";

    return (
        <div className="sm:max-w-[800px] mx-auto lg:px-0 px-5 my-20">
            <h1 className="text-3xl font-bold text-center mb-10">Create Guide</h1>

            <div className="border rounded-md p-5 space-y-5">
                <h2 className="text-xl font-semibold">Create your Delivery Guide</h2>

                <div className="space-y-4">
                    <div>
                        <Label className="mb-2">Guide Title</Label>
                        <Input
                            placeholder="Guide Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="mb-2">Live Link</Label>
                        <Input
                            placeholder="Live Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="mb-2">Details</Label>
                        <Textarea
                            placeholder="Details"
                            className="h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* Steps Form */}
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="mt-5 space-y-4 border rounded-md p-4 relative"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Step {index + 1}</h3>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveStep(index)}
                                disabled={steps.length === 1}
                            >
                                <Trash className="h-5 w-5 text-red-500" />
                            </Button>
                        </div>

                        <FileUploader
                            onFileSelect={(file) => handleStepChange(index, "photo", file)}
                        />

                        <div>
                            <Label className="mb-2">Caption</Label>
                            <Input
                                placeholder="Add Caption"
                                value={step.caption}
                                onChange={(e) =>
                                    handleStepChange(index, "caption", e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Instructions</Label>
                            <Input
                                placeholder="Add Instruction"
                                value={step.instruction}
                                onChange={(e) =>
                                    handleStepChange(index, "instruction", e.target.value)
                                }
                            />
                        </div>
                    </div>
                ))}

                <div className="grid grid-cols-2 gap-5 mt-5">
                    <Button
                        onClick={handleAddStep}
                        className="w-full bg-black text-white"
                    >
                        + Add Steps
                    </Button>
                    <Button
                        onClick={handleLiveLocation}
                        className="w-full bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                    >
                        <Navigation /> Live Location
                    </Button>
                </div>
            </div>

            <div className="mt-10">
                <Button
                    onClick={handleSubmit}
                    className="w-full bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                    disabled={isLoading}
                >
                    Push Guide
                </Button>
            </div>

            {/* Share Modal */}
            <Dialog open={openShareModal} onOpenChange={setOpenShareModal}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Share This Guide</DialogTitle>
                        <DialogDescription>
                            Share the guide with private or public access.
                        </DialogDescription>
                    </DialogHeader>

                    {guideId ? (
                        <div className="flex flex-col gap-6 mt-4">
                            {/* Social Share */}
                            <div className="flex gap-4 justify-center mt-3">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${publicUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src={facebook} alt="fb" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                        publicUrl
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src={whatsApp} alt="wa" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href={`fb-messenger://share/?link=${encodeURIComponent(publicUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src={messenger} alt="messenger" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href={`mailto:?subject=Check this guide&body=${encodeURIComponent(
                                        publicUrl
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src={email} alt="email" className="w-8 h-8 cursor-pointer" />
                                </a>
                            </div>

                            {/* Private Link */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-700">🔒 Private Link</h3>
                                <div className="flex gap-2">
                                    <Input value={privateUrl} readOnly />
                                    <Button
                                        className="bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                                        onClick={() => handleCopy(privateUrl)}
                                    >
                                        <Copy size={16} />
                                    </Button>
                                </div>
                            </div>

                            {/* Public Link */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-700">🌍 Public Link</h3>
                                <div className="flex gap-2">
                                    <Input value={publicUrl} readOnly />
                                    <Button
                                        className="bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                                        onClick={() => handleCopy(publicUrl)}
                                    >
                                        <Copy size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            Please create a guide first to generate share links.
                        </p>
                    )}

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateGuide;