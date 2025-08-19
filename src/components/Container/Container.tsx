"use client";
import React, { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
    return (
        <div className={`max-w-[1280px] mx-auto w-full lg:px-0 px-5 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
