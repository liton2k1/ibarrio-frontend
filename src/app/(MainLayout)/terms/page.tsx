"use client";

import React from "react";
import Container from "@/components/Container/Container";

const Terms = () => {
    return (
        <div className="py-20 bg-gray-50">
            <Container className="prose lg:prose-lg max-w-4xl">
                <h1 className="md:text-4xl text-2xl font-bold mb-6">Terms & Conditions</h1>
                <p className="text-gray-600">
                    Welcome to Doorstep! By using our services, you agree to the following
                    terms and conditions. Please read them carefully.
                </p>

                <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                    By accessing or using our services, you agree to comply with these
                    Terms and all applicable laws and regulations.
                </p>

                <h2 className="text-2xl font-semibold mt-8">2. Use of Service</h2>
                <p className="text-gray-600">
                    You agree not to misuse our services. This includes attempting to gain
                    unauthorized access to the system, disrupting service, or engaging in
                    fraudulent activities.
                </p>

                <h2 className="text-2xl font-semibold mt-8">3. Limitation of Liability</h2>
                <p className="text-gray-600">
                    Doorstep shall not be held liable for any indirect, incidental, or
                    consequential damages resulting from your use of our services.
                </p>

                <h2 className="text-2xl font-semibold mt-8">4. Changes to Terms</h2>
                <p className="text-gray-600">
                    We reserve the right to update or modify these Terms at any time. Any
                    changes will be posted on this page with the updated date.
                </p>

                <p className="mt-8 text-gray-600">
                    If you have any questions about these Terms, please contact us at{" "}
                    <a
                        href="mailto:support@doorstep.app"
                        className="text-purple-600 underline"
                    >
                        support@doorstep.app
                    </a>
                    .
                </p>
            </Container>
        </div>
    );
};

export default Terms;