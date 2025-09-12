/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
    maxSizeMB?: number;
    initialImageUrl?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    onFileSelect,
    maxSizeMB = 5,
    initialImageUrl,
}) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const maxSize = maxSizeMB * 1024 * 1024;

    // Set initial image when component mounts or initialImageUrl changes
    useEffect(() => {
        console.log("Initial image URL:", initialImageUrl); // Debug log
        if (initialImageUrl && !selectedFile) {
            setPreviewUrl(initialImageUrl);
        }
    }, [initialImageUrl, selectedFile]);

    const validateFile = (file: File): string | null => {
        if (!file.type.startsWith('image/')) {
            return 'Please select an image file';
        }
        if (file.size > maxSize) {
            return `File size must be less than ${maxSizeMB}MB`;
        }
        return null;
    };

    const handleFileSelect = (file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        setSelectedFile(file);

        // Create preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Notify parent
        if (onFileSelect) {
            onFileSelect(file);
        }

        // Clean up previous object URL
        return () => URL.revokeObjectURL(objectUrl);
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setPreviewUrl(initialImageUrl || null);
        setError("");

        if (onFileSelect) {
            onFileSelect(null);
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="relative">
                <div
                    role="button"
                    onClick={openFileDialog}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                    className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors cursor-pointer"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="sr-only"
                        aria-label="Upload file"
                    />

                    {previewUrl ? (
                        <div className="absolute inset-0">
                            <Image
                                src={previewUrl}
                                alt="Image preview"
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    console.error("Image failed to load:", previewUrl);
                                    setPreviewUrl(null);
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                            <div
                                className="bg-background mb-2 flex h-11 w-11 items-center justify-center rounded-full border"
                                aria-hidden="true"
                            >
                                <ImageUpIcon className="h-4 w-4 opacity-60" />
                            </div>
                            <p className="mb-1.5 text-sm font-medium">
                                Drop your image here or click to browse
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Max size: {maxSizeMB}MB
                            </p>
                        </div>
                    )}
                </div>

                {previewUrl && (
                    <div className="absolute top-4 right-4">
                        <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            onClick={handleRemove}
                            aria-label="Remove image"
                        >
                            <XIcon className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            {error && (
                <div
                    className="text-destructive flex items-center gap-1 text-xs"
                    role="alert"
                >
                    <AlertCircleIcon className="h-3 w-3 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default FileUploader;