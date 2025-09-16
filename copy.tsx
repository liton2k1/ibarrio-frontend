/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Trash, Copy, ArrowRight } from "lucide-react";
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
import { useRouter } from "next/navigation";

interface Step {
    caption: string;
    photo?: File | null;
}

const CreateGuide = () => {
    const router = useRouter();
    const [createGuide, { isLoading }] = useCreateGuideMutation();

    const [title, setTitle] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const [steps, setSteps] = useState<Step[]>([
        { caption: "", photo: null },
    ]);

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [guideId, setGuideId] = useState<string | null>(null);

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

    // Copy to clipboard helper
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    // Handle Preview - Client-side only, no database
    const handlePreview = () => {
        // Validate required fields
        if (!address.trim()) {
            toast.error("Please enter an address before previewing.");
            return;
        }

        if (steps.every(step => !step.caption.trim())) {
            toast.error("Please add at least one step with a caption.");
            return;
        }

        // Store guide data in sessionStorage for preview
        const previewData = {
            title,
            address,
            steps: steps.map((step) => ({
                caption: step.caption,
                photo: step.photo,
            })),
        };

        sessionStorage.setItem('previewGuideData', JSON.stringify(previewData));

        // Navigate to preview page
        router.push('/preview-guide');
    };

    // Handle Publish - This is when we hit the database
    const handlePublish = async () => {
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                title,
                address,
                steps: steps.map((step) => ({
                    caption: step.caption,
                })),
            })
        );

        steps.forEach((step) => {
            if (step.photo) formData.append("file", step.photo);
        });

        try {
            const res = await createGuide(formData).unwrap();
            console.log("Guide published:", res);

            // Save the guideId
            setGuideId(res?.data?._id);

            toast.success("Guide published successfully!");
            setOpenConfirmationModal(true);

            // Clear sessionStorage since we've published
            sessionStorage.removeItem('previewGuideData');
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to publish guide");
        }
    };

    // Build Share Links
    const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

    const privateEditUrl = guideId ? `${baseUrl}/edit-guide/${guideId}` : "";
    const publicUrl = guideId ? `${baseUrl}/guide/${guideId}` : "";

    return (
        <div className="sm:max-w-[800px] mx-auto lg:px-0 px-5 my-20">
            <h1 className="text-3xl font-bold text-center mb-10">Create Your Doorstep Page</h1>

            <div className="border rounded-md p-5 space-y-5">
                <div className="space-y-4">
                    <div>
                        <Label className="mb-2">Guide Title</Label>
                        <Input
                            placeholder="Title (optional) – e.g. Ian's Home"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="mb-2">Guide Address</Label>
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
            </div>

            {/* Preview Button */}
            <div className="mt-10">
                <Button
                    onClick={handlePreview}
                    className="w-full bg-[#9E58CD] hover:bg-[#9E58CD] text-white flex items-center justify-center gap-2"
                >
                    Preview Page
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Hidden Publish Button - This would be called from preview page */}
            {typeof window !== "undefined" && window.location.pathname === "/preview-guide" && (
                <div className="mt-5">
                    <Button
                        onClick={handlePublish}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "Publishing..." : "Publish"}
                    </Button>
                </div>
            )}

            {/* Confirmation Modal - Shows after publishing */}
            <Dialog open={openConfirmationModal} onOpenChange={setOpenConfirmationModal}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>🎉 Your Doorstep Page is Live!</DialogTitle>
                        <DialogDescription>
                            Your guide has been published successfully. Here are your links:
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