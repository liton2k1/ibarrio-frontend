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
import FileUploader from "@/components/FileUploader/FileUploader";

interface Step {
    title: string;
    address: string;
    photo?: string;
    caption: string;
}

interface UpdateGuideModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    guide: {
        title: string;
        address: string;
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
    const [address, setAddress] = useState(guide.address);
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
        const updatedGuide = { title, address, steps };
        onUpdate(updatedGuide);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Guide</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div>
                        <Label className="mb-2">Guide Title</Label>
                        <Input
                            placeholder="Title (optional) – e.g. Ian’s Home"
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