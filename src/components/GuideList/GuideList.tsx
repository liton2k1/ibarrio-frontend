"use client";

import React, { useState } from "react";
import Container from "../Container/Container";
import Image from "next/image";
import { MoreVertical, Share2, ArrowRight } from "lucide-react";
import img from "../../../public/images/img (4).png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../FileUploader/FileUploader";

const guides = [
    { id: 1, title: "XTZ Home Direction", description: "Follow this simple visual route to reach the correct door with no confusion.", image: img },
    { id: 2, title: "XTZ Home Direction", description: "Follow this simple visual route to reach the correct door with no confusion.", image: img },
    { id: 3, title: "XTZ Home Direction", description: "Follow this simple visual route to reach the correct door with no confusion.", image: img },
];

const GuideList = () => {
    const [openModalId, setOpenModalId] = useState<number | null>(null);

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
                            <button className="bg-[#9E58CD] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 cursor-pointer">
                                Share <Share2 size={16} />
                            </button>

                            {/* Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <MoreVertical size={18} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setOpenModalId(guide.id)} className="cursor-pointer">Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Edit Modal */}
                        {openModalId === guide.id && (
                            <Dialog open={true} onOpenChange={(open) => !open && setOpenModalId(null)}>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Update Your Guide</DialogTitle>
                                        <DialogDescription>
                                            Guide Details
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Input id="homeDirection" name="homeDirection" placeholder="XYZ Home direction" />
                                        </div>
                                        <div className="grid gap-3">
                                            <Textarea id="description" name="description" placeholder="Description" />
                                        </div>
                                    </div>
                                    <FileUploader />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" onClick={() => setOpenModalId(null)}>Cancel</Button>
                                        </DialogClose>
                                        <Button className="bg-[#9E58CD] hover:bg-[#9E58CD]" type="submit">Update</Button>
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
