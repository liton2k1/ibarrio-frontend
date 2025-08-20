"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Textarea } from "@/components/ui/textarea";
import { Navigation, Trash } from "lucide-react";

interface Step {
    id: number;
    photo?: string;
    instruction: string;
}

const CreateGuide = () => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [steps, setSteps] = useState<Step[]>([{ id: 1, instruction: "" }]);

    const handleAddStep = () => {
        setSteps([...steps, { id: steps.length + 1, instruction: "" }]);
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
                <Button className="w-full bg-[#9E58CD] hover:bg-[#9E58CD] text-white">
                    Push Guide
                </Button>
            </div>
        </div>
    );
};

export default CreateGuide;
