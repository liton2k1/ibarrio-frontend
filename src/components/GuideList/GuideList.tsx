"use client";

import React, { useState } from "react";
import Container from "../Container/Container";
import Image from "next/image";
import { MoreVertical, Share2, ArrowRight, Copy, Facebook, Twitter, Linkedin } from "lucide-react";
import img from "../../../public/images/img (4).png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../FileUploader/FileUploader";
import toast from "react-hot-toast";

const guides = [
    { id: 1, title: "XTZ Home Direction", description: "Follow this simple visual route to reach the correct door with no confusion.", image: img, liveUrl: "https://www.google.com/maps" },
    { id: 2, title: "XTZ Home Direction", description: "Follow this simple visual route to reach the correct door with no confusion.", image: img, liveUrl: "https://www.google.com/maps" },
    { id: 3, title: "XTZ Home Direction", description: "Follow this simple visual route to reach the correct door with no confusion.", image: img, liveUrl: "https://www.google.com/maps" },
];

const GuideList = () => {
    const [openEditModalId, setOpenEditModalId] = useState<number | null>(null);
    const [openShareModalId, setOpenShareModalId] = useState<number | null>(null);

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!')
    };

    return (
        <Container className="mt-20">
            <h1 className="lg:text-4xl text-3xl font-bold mb-8">Guide List</h1>

            <div className="space-y-5">
                {guides.map((guide) => (
                    <div key={guide.id} className="bg-white shadow-sm rounded-md flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                        {/* Image */}
                        <Image src={guide.image} alt={guide.title} width={200} height={200} className="w-full sm:w-auto rounded-md object-fill" />

                        {/* Text */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{guide.title}</h3>
                            <p className="text-gray-500 text-sm">{guide.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 ml-auto">
                            <button className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                                View Guide
                            </button>

                            {/* Share Button */}
                            <button
                                className="bg-[#9E58CD] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 cursor-pointer"
                                onClick={() => setOpenShareModalId(guide.id)}
                            >
                                Share <Share2 size={16} />
                            </button>

                            {/* Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <MoreVertical size={18} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setOpenEditModalId(guide.id)} className="cursor-pointer">Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Edit Modal */}
                        {openEditModalId === guide.id && (
                            <Dialog open={true} onOpenChange={(open) => !open && setOpenEditModalId(null)}>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Update Your Guide</DialogTitle>
                                        <DialogDescription>Guide Details</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <Input id="homeDirection" name="homeDirection" placeholder="XYZ Home direction" />
                                        <Textarea id="description" name="description" placeholder="Description" />
                                    </div>
                                    <FileUploader />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" onClick={() => setOpenEditModalId(null)}>Cancel</Button>
                                        </DialogClose>
                                        <Button className="bg-[#9E58CD] hover:bg-[#9E58CD]" type="submit">Update</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}

                        {/* Share Modal */}
                        {openShareModalId === guide.id && (
                            <Dialog open={true} onOpenChange={(open) => !open && setOpenShareModalId(null)}>
                                <DialogContent className="sm:max-w-[400px]">
                                    <DialogHeader>
                                        <DialogTitle>Share This Guide</DialogTitle>
                                        <DialogDescription>Share the guide link with others.</DialogDescription>
                                    </DialogHeader>

                                    <div className="flex flex-col gap-4 mt-4">
                                        {/* Social Icons */}
                                        <div className="flex gap-4 justify-center">
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${guide.liveUrl}`} target="_blank" rel="noopener noreferrer">
                                                <Facebook className="w-8 h-8 text-blue-600 cursor-pointer" />
                                            </a>
                                            <a href={`https://twitter.com/intent/tweet?url=${guide.liveUrl}`} target="_blank" rel="noopener noreferrer">
                                                <Twitter className="w-8 h-8 text-blue-400 cursor-pointer" />
                                            </a>
                                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${guide.liveUrl}`} target="_blank" rel="noopener noreferrer">
                                                <Linkedin className="w-8 h-8 text-blue-700 cursor-pointer" />
                                            </a>
                                        </div>

                                        {/* Copy Link */}
                                        <div className="flex gap-2">
                                            <Input value={guide.liveUrl} readOnly />
                                            <Button onClick={() => handleCopy(guide.liveUrl)}><Copy size={16} /></Button>
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

            {/* View More Button */}
            <div className="mt-10 text-center">
                <button className="border border-[#9E58CD] text-[#9E58CD] px-5 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-[#9E58CD] hover:text-white transition cursor-pointer">
                    View more <ArrowRight size={16} />
                </button>
            </div>
        </Container>
    );
};

export default GuideList;
