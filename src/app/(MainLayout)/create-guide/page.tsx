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

interface Step {
    id: number;
    title: string;
    url: string;
    description: string;
    photo?: string;
    instruction: string;
}

const CreateGuide = () => {
    const [title, setTitle] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [steps, setSteps] = useState<Step[]>([
        {
            id: 1,
            instruction: "",
            title: "",
            url: "",
            description: "",
        },
    ]);

    const [openShareModal, setOpenShareModal] = useState(false);

    const handleAddStep = () => {
        setSteps([
            ...steps,
            {
                id: steps.length + 1,
                instruction: "",
                title: "",
                url: "",
                description: "",
            },
        ]);
    };

    const handleRemoveStep = (id: number) => {
        if (steps.length === 1) return;
        setSteps(steps.filter((step) => step.id !== id));
    };

    const handleInstructionChange = (id: number, value: string) => {
        setSteps(
            steps.map((step) =>
                step.id === id ? { ...step, instruction: value } : step
            )
        );
    };

    // Handle Live Location Button
    const handleLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Redirect to Google Maps with user location
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
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    // Handle Push Guide (open modal)
    const handlePushGuide = () => {
        setOpenShareModal(true);
    };

    const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const privateUrl = `${baseUrl}/guide-info/123`; // Replace 123 with new guide ID after save
    const publicUrl = `${baseUrl}/public-guide/123`;

    return (
        <div className="md:w-2xl w-full mx-auto lg:px-0 px-5 my-20">
            <h1 className="text-3xl font-bold text-center mb-10">Create Guide</h1>

            <div className="border rounded-md p-5 space-y-5">
                <h2 className="text-xl font-semibold">Create your Delivery Guide</h2>

                <div className="space-y-4">
                    <Input
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        placeholder="Enter Live Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <Textarea
                        placeholder="Say something about this direction"
                        className="h-32"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Steps Form */}
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="mt-5 space-y-4 border rounded-md p-4 relative"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Step {step.id}</h3>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveStep(step.id)}
                                disabled={steps.length === 1}
                            >
                                <Trash className="h-5 w-5 text-red-500" />
                            </Button>
                        </div>

                        <FileUploader />

                        <div>
                            <Label className="mb-2">Instructions</Label>
                            <Input
                                placeholder="Enter through the main gate"
                                value={step.instruction}
                                onChange={(e) =>
                                    handleInstructionChange(step.id, e.target.value)
                                }
                            />
                        </div>
                    </div>
                ))}

                <div className="grid grid-cols-2 gap-5">
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
                    className="w-full bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                    onClick={handlePushGuide}
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

                    <div className="flex flex-col gap-6 mt-4">
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
