/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Trash, Copy, ArrowRight, X, MapPin } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import facebook from "../../../../../public/logo/facebook.png";
import messenger from "../../../../../public/logo/messenger.png";
import whatsApp from "../../../../../public/logo/social.png";
import email from "../../../../../public/logo/mail.png";
import Image from "next/image";
import { useCreateGuideMutation } from "@/redux/guideApi";
import toast from "react-hot-toast";
import Container from "@/components/Container/Container";
import logo from "../../../../../public/logo/doorstep.png";
import Link from "next/link";

interface Step {
    caption: string;
    photo?: File | null;
}

const CreateGuide = () => {
    const [createGuide, { isLoading }] = useCreateGuideMutation();

    // Guide state
    const [title, setTitle] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [steps, setSteps] = useState<Step[]>([{ caption: "", photo: null }]);

    // UI state
    const [isPreview, setIsPreview] = useState(false);
    const [previewData, setPreviewData] = useState<any>(null);
    const [guideId, setGuideId] = useState<string | null>(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    // Add/remove steps
    const handleAddStep = () => {
        if (steps.length >= 5) {
            toast.error("You can add maximum 5 steps.");
            return;
        }
        setSteps([...steps, { caption: "", photo: null }]);
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

    // Remove image from step
    const handleRemoveImage = (index: number) => {
        handleStepChange(index, "photo", null);
    };

    // Copy to clipboard
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    // Preview
    const handlePreview = () => {
        if (!address.trim()) {
            toast.error("Please enter an address before previewing.");
            return;
        }
        if (steps.every((step) => !step.caption.trim())) {
            toast.error("Please add at least one step with a caption.");
            return;
        }
        if (steps.every((step) => !step.photo)) {
            toast.error("Please add at least one image before previewing.");
            return;
        }

        const data = { title, address, steps };
        setPreviewData(data);
        setIsPreview(true);
    };

    // Publish
    const handlePublish = async () => {
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                title,
                address,
                steps: steps.map((step) => ({ caption: step.caption })),
            })
        );
        steps.forEach((step) => {
            if (step.photo) formData.append("file", step.photo);
        });

        try {
            const res = await createGuide(formData).unwrap();

            // Save guideId first
            setGuideId(res?.data?._id);

            // Exit preview mode to show modal
            setIsPreview(false);

            // Open confirmation modal
            setOpenConfirmationModal(true);

            toast.success("Guide published successfully!");

            // Clean up preview storage
            sessionStorage.removeItem("previewGuideData");
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to publish guide");
        }
    };

    // Share URLs (different domains for edit and public)
    const baseUrlEdit = "https://doorstep.app";  
    const baseUrlD = "https://mydoorstep.app"; 
    const privateEditUrl = guideId ? `${baseUrlEdit}/edit/${guideId}` : "";
    const publicUrl = guideId ? `${baseUrlD}/d/${guideId}` : "";

    // Preview UI
    if (isPreview && previewData) {
        return (
            <Container className="max-w-xl mx-auto mt-20">
                <div className="text-center">
                    <h1 className="lg:text-5xl text-3xl font-bold mb-3">{previewData.title}</h1>
                    <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        {previewData.address}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 mt-10">
                    {previewData.steps.map((step: Step, index: number) => (
                        <div key={index}>
                            <p className="flex items-center gap-3 md:text-xl font-semibold mb-5">
                                <span className="bg-black text-white text-xl font-bold min-w-8 min-h-8 flex items-center justify-center rounded-full flex-shrink-0">
                                    {index + 1}
                                </span>
                                {step.caption}
                            </p>
                            {step.photo && (
                                <Image
                                    src={URL.createObjectURL(step.photo)}
                                    alt={`Step ${index + 1}`}
                                    className="w-full md:h-96 h-64 object-cover rounded-md"
                                    height={400}
                                    width={400}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-5 mt-5">
                    <Button
                        variant="outline"
                        onClick={() => setIsPreview(false)}
                        className="flex-1"
                    >
                        Back to Edit
                    </Button>
                    <Button
                        onClick={handlePublish}
                        className="flex-1 bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "Publishing..." : "Publish"}
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-20">
                    <p className="text-center text-gray-400">Powered By</p>
                    <Link href="/" className="flex items-center">
                        <Image className="w-24" src={logo} alt="Doorstep Logo" />
                    </Link>
                </div>
            </Container>
        );
    }

    // Create Guide UI
    return (
        <div className="sm:max-w-[800px] mx-auto lg:px-0 px-5 my-20">
            <h1 className="text-3xl font-bold text-center mb-10">Create Your Doorstep Page</h1>

            <div className="border rounded-md p-5 space-y-5">
                <div className="space-y-4">
                    <div>
                        <Label className="mb-2">Title (Optional)</Label>
                        <Input
                            placeholder="Title – e.g. Mary's Home"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="mb-2">Address</Label>
                        <Input
                            placeholder="Enter street address or location"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Steps Form */}
                {steps.map((step, index) => (
                    <div key={index} className="mt-5 space-y-4 border rounded-md p-4 relative">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Step {index + 1}</h3>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => handleRemoveStep(index)}
                                disabled={steps.length === 1}
                            >
                                <Trash className="h-5 w-5 text-red-500" />
                            </Button>
                        </div>

                        {step.photo ? (
                            <div className="relative">
                                <Image
                                    src={URL.createObjectURL(step.photo)}
                                    alt={`Step ${index + 1}`}
                                    className="w-full h-60 object-cover rounded-md"
                                    height={400}
                                    width={400}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 rounded-full"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <FileUploader
                                onFileSelect={(file) => handleStepChange(index, "photo", file)}
                            />
                        )}

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
                    </div>
                ))}

                <div className="mt-5">
                    <Button
                        onClick={handleAddStep}
                        className="w-full bg-black text-white"
                    >
                        + Add Steps
                    </Button>
                </div>

                {/* Preview CTA */}
                <div className="">
                    <Button
                        onClick={handlePreview}
                        className="w-full bg-[#9E58CD] hover:bg-[#9E58CD] text-white flex items-center justify-center gap-2"
                        disabled={
                            !address.trim() ||
                            steps.every((step) => !step.caption.trim()) ||
                            steps.every((step) => !step.photo)
                        }
                    >
                        Preview Page
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Dialog open={openConfirmationModal} onOpenChange={setOpenConfirmationModal}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">🎉 Your Doorstep Page is Live!</DialogTitle>
                        <DialogDescription>
                            Your guide has been published successfully. Here are your links:
                        </DialogDescription>
                    </DialogHeader>

                    {guideId ? (
                        <div className="flex flex-col gap-6 mt-4">
                            <div className="flex gap-4 justify-center mt-3">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${publicUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src={facebook} alt="fb" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(publicUrl)}`}
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
                                    href={`mailto:?subject=Check this guide&body=${encodeURIComponent(publicUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src={email} alt="email" className="w-8 h-8 cursor-pointer" />
                                </a>
                            </div>

                            {/* Public Link */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-700">🌍 Public Page Link</h3>
                                <div className="flex gap-2">
                                    <Input value={publicUrl} readOnly />
                                    <Button
                                        className="bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                                        onClick={() => handleCopy(publicUrl)}
                                    >
                                        <Copy size={16} />
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500">Share this link with anyone</p>
                            </div>

                            {/* Private Edit Link */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-700">🔒 Private Edit Link</h3>
                                <div className="flex gap-2">
                                    <Input value={privateEditUrl} readOnly />
                                    <Button
                                        className="bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                                        onClick={() => handleCopy(privateEditUrl)}
                                    >
                                        <Copy size={16} />
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500">Keep this private - use to edit your guide</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            Something went wrong. Please try again.
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