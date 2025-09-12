/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/FileUploader/FileUploader";

interface Step {
    title: string;
    liveUrl: string;
    description: string;
    photo?: string;
    instruction: string;
    caption: string;
}

interface UpdateGuideModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    guide: {
        title: string;
        liveUrl: string;
        description: string;
        steps: Step[];
    };
    onUpdate: (updatedGuide: any) => void;
}

const UpdateGuideModal = ({
    open,
    onOpenChange,
    guide,
    onUpdate,
}: UpdateGuideModalProps) => {
    const [title, setTitle] = useState(guide.title);
    const [liveUrl, setLiveUrl] = useState(guide.liveUrl);
    const [description, setDescription] = useState(guide.description);
    const [steps, setSteps] = useState<Step[]>(guide.steps);

    const handleStepChange = (
        index: number,
        field: keyof Step,
        value: string
    ) => {
        setSteps((prev) =>
            prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
        );
    };

    // New function to handle photo updates
    const handlePhotoChange = (index: number, file: File | null) => {
        if (file) {
            // Create a preview URL for the new file
            const photoUrl = URL.createObjectURL(file);
            setSteps((prev) =>
                prev.map((s, i) => (i === index ? { ...s, photo: photoUrl } : s))
            );
        } else {
            // Remove photo if file is null
            setSteps((prev) =>
                prev.map((s, i) => (i === index ? { ...s, photo: undefined } : s))
            );
        }
    };

    const handleSave = () => {
        const updatedGuide = { title, liveUrl, description, steps };
        onUpdate(updatedGuide);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Guide</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
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
                            value={liveUrl}
                            onChange={(e) => setLiveUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="mb-2">Guide Description</Label>
                        <Textarea
                            placeholder="Guide Description"
                            className="h-28"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-5 mt-5">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="border rounded-md p-4 space-y-4 relative"
                        >
                            {/* Pass existing photo and handle file selection */}
                            <div>
                                <Label className="mb-2">Step Image</Label>
                                {/* Debug info - remove this after fixing */}
                                {step.photo && (
                                    <p className="text-xs text-gray-500 mb-2">
                                        Current image: {step.photo.substring(0, 50)}...
                                    </p>
                                )}
                                <FileUploader
                                    initialImageUrl={step.photo}
                                    onFileSelect={(file) => handlePhotoChange(index, file)}
                                />
                            </div>

                            <div>
                                <Label className="mb-2">Caption</Label>
                                <Input
                                    placeholder="Caption"
                                    value={step.caption}
                                    onChange={(e) =>
                                        handleStepChange(index, "caption", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label className="mb-2">Instruction</Label>
                                <Input
                                    placeholder="Instruction"
                                    value={step.instruction}
                                    onChange={(e) =>
                                        handleStepChange(index, "instruction", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    ))}

                </div>

                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        className="bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateGuideModal;