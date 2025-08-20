/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Container from "../Container/Container";
import Image from "next/image";
import {
    MoreVertical,
    Share2,
    ArrowRight,
    Copy,
    Trash,
    Navigation,
} from "lucide-react";
import img from "../../../public/images/img (4).png";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../FileUploader/FileUploader";
import toast from "react-hot-toast";
import Link from "next/link";
import facebook from "../../../public/logo/facebook.png";
import messenger from "../../../public/logo/messenger.png";
import whatsApp from "../../../public/logo/social.png";
import email from "../../../public/logo/mail.png";

interface Step {
    id: number;
    photo?: string;
    instruction: string;
}

const guides = [
    {
        id: 1,
        title: "XTZ Home Direction",
        description:
            "Follow this simple visual route to reach the correct door with no confusion.",
        image: img,
        liveUrl:
            "https://www.google.com/maps/dir/Meradia+Kacha+Bazar,+Dacca/23.7604444,90.42725/@23.7615566,90.4303804,1989m/data=!3m2!1e3!4b1!4m9!4m8!1m5!1m1!1s0x3755b8076f42fcb9:0x92c59481fa058655!2m2!1d90.4442464!2d23.7618417!1m0!3e3?entry=ttu&g_ep=EgoyMDI1MDgxOC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
        id: 2,
        title: "Office Path",
        description: "Use the side entrance and follow the path to the second floor.",
        image: img,
        liveUrl:
            "https://www.google.com/maps/dir/Meradia+Kacha+Bazar,+Dacca/23.7604444,90.42725/@23.7615566,90.4303804,1989m/data=!3m2!1e3!4b1!4m9!4m8!1m5!1m1!1s0x3755b8076f42fcb9:0x92c59481fa058655!2m2!1d90.4442464!2d23.7618417!1m0!3e3?entry=ttu&g_ep=EgoyMDI1MDgxOC4wIKXMDSoASAFQAw%3D%3D",
    },
];

const GuideList = () => {
    const [openEditModalId, setOpenEditModalId] = useState<number | null>(null);
    const [openShareModalId, setOpenShareModalId] = useState<number | null>(null);

    const [editTitle, setEditTitle] = useState("");
    const [editLink, setEditLink] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [steps, setSteps] = useState<Step[]>([{ id: 1, instruction: "" }]);

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    const handleLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const googleMapsUrl = `https://www.google.com/maps/place/${latitude},${longitude}`;
                    setEditLink(googleMapsUrl);
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

    const handleAddStep = () => {
        setSteps([...steps, { id: steps.length + 1, instruction: "" }]);
    };

    const handleRemoveStep = (id: number) => {
        if (steps.length === 1) return;
        setSteps(steps.filter((step) => step.id !== id));
    };

    const handleInstructionChange = (id: number, value: string) => {
        setSteps(
            steps.map((step) => (step.id === id ? { ...step, instruction: value } : step))
        );
    };

    const handleOpenEdit = (guide: any) => {
        setEditTitle(guide.title);
        setEditDescription(guide.description);
        setEditLink(guide.liveUrl);
        setSteps([{ id: 1, instruction: "" }]);
        setOpenEditModalId(guide.id);
    };

    return (
        <Container className="mt-20">
            <h1 className="lg:text-4xl text-3xl font-bold mb-8">Guide List</h1>

            <div className="space-y-5">
                {guides.map((guide) => (
                    <div
                        key={guide.id}
                        className="border border-gray-300 rounded-md flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4"
                    >
                        <Image
                            src={guide.image}
                            alt={guide.title}
                            width={200}
                            height={200}
                            className="w-full sm:w-auto rounded-md object-fill"
                        />

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{guide.title}</h3>
                            <p className="text-gray-500 text-sm">{guide.description}</p>
                        </div>

                        <div className="flex items-center gap-3 ml-auto">
                            <Link href={`/guide-info/${guide.id}`}>
                                <button className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                                    View Guide
                                </button>
                            </Link>

                            <button
                                className="bg-[#9E58CD] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 cursor-pointer"
                                onClick={() => setOpenShareModalId(guide.id)}
                            >
                                Share <Share2 size={16} />
                            </button>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <MoreVertical size={18} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={() => handleOpenEdit(guide)}
                                        className="cursor-pointer"
                                    >
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Edit Modal */}
                        {openEditModalId === guide.id && (
                            <Dialog
                                open={true}
                                onOpenChange={(open) => !open && setOpenEditModalId(null)}
                            >
                                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Edit Guide</DialogTitle>
                                        <DialogDescription>Update your guide details.</DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-4">
                                        <Input
                                            placeholder="Enter Title"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                        <Input
                                            placeholder="Enter Live Link"
                                            value={editLink}
                                            onChange={(e) => setEditLink(e.target.value)}
                                        />
                                        <Textarea
                                            placeholder="Say something about this direction"
                                            className="h-32"
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                        />
                                    </div>

                                    {/* Steps */}
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
                                                <Input
                                                    placeholder="Enter instruction"
                                                    value={step.instruction}
                                                    onChange={(e) => handleInstructionChange(step.id, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="grid grid-cols-2 gap-5 mt-4">
                                        <Button onClick={handleAddStep} className="w-full bg-black text-white">
                                            + Add Step
                                        </Button>
                                        <Button
                                            onClick={handleLiveLocation}
                                            className="w-full bg-[#9E58CD] hover:bg-[#9E58CD] text-white"
                                        >
                                            <Navigation /> Live Location
                                        </Button>
                                    </div>

                                    <DialogFooter className="mt-6">
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button className="bg-[#9E58CD] hover:bg-[#9E58CD] text-white">
                                            Update Guide
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}

                        {/* Share Modal */}
                        {openShareModalId === guide.id && (
                            <Dialog
                                open={true}
                                onOpenChange={(open) => !open && setOpenShareModalId(null)}
                            >
                                <DialogContent className="sm:max-w-[400px]">
                                    <DialogHeader>
                                        <DialogTitle>Share This Guide</DialogTitle>
                                        <DialogDescription>Share the guide link with others.</DialogDescription>
                                    </DialogHeader>

                                    <div className="flex flex-col gap-4 mt-4">
                                        <div className="flex gap-4 justify-center">
                                            {/* Facebook */}
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${guide.liveUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Image src={facebook} alt="" className="w-8 h-8 cursor-pointer" />
                                            </a>

                                            {/* WhatsApp */}
                                            <a
                                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(guide.liveUrl)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Image src={whatsApp} alt="" className="w-8 h-8 cursor-pointer" />
                                            </a>

                                            {/* Messenger */}
                                            <a
                                                href={`fb-messenger://share/?link=${encodeURIComponent(guide.liveUrl)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Image src={messenger} alt="" className="w-8 h-8 cursor-pointer" />
                                            </a>

                                            {/* Email */}
                                            <a
                                                href={`mailto:?subject=${encodeURIComponent(guide.title)}&body=${encodeURIComponent(guide.liveUrl)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Image src={email} alt="" className="w-8 h-8 cursor-pointer" />
                                            </a>
                                        </div>


                                        <div className="flex gap-2">
                                            <Input value={guide.liveUrl} readOnly />
                                            <Button className="bg-[#9E58CD] hover:bg-[#9E58CD] text-white" onClick={() => handleCopy(guide.liveUrl)}>
                                                <Copy size={16} />
                                            </Button>
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Close</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <button className="border border-[#9E58CD] text-[#9E58CD] px-5 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-[#9E58CD] hover:text-white transition cursor-pointer">
                    View more <ArrowRight size={16} />
                </button>
            </div>
        </Container>
    );
};

export default GuideList;
