"use client";

import React from "react";
import Container from "@/components/Container/Container";

const PrivacyPage = () => {
    return (
        <div className="py-20 bg-gray-50">
            <Container className="prose lg:prose-lg max-w-4xl">
                <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
                <p className="text-gray-600">
                    At Doorstep, we value your privacy. This Privacy Policy explains how
                    we collect, use, and protect your personal information.
                </p>

                <h2 className="text-2xl font-semibold mt-8">1. Information We Collect</h2>
                <p className="text-gray-600">
                    We may collect personal information such as your name, email address,
                    phone number, and location data to provide better service.
                </p>

                <h2 className="text-2xl font-semibold mt-8">2. How We Use Information</h2>
                <p className="text-gray-600">
                    Your information is used to process deliveries, improve customer
                    experience, and communicate with you regarding our services.
                </p>

                <h2 className="text-2xl font-semibold mt-8">3. Data Security</h2>
                <p className="text-gray-600">
                    We implement strict security measures to safeguard your personal
                    information. However, no method of transmission over the Internet is
                    100% secure.
                </p>

                <h2 className="text-2xl font-semibold mt-8">4. Sharing of Information</h2>
                <p className="text-gray-600">
                    We do not sell or rent your personal information to third parties.
                    Information may only be shared with trusted partners who help us
                    deliver our services.
                </p>

                <h2 className="text-2xl font-semibold mt-8">5. Changes to Privacy Policy</h2>
                <p className="text-gray-600">
                    We may update this Privacy Policy from time to time. Updates will be
                    posted on this page with the revised date.
                </p>

                <p className="mt-8 text-gray-600">
                    If you have any questions about this Privacy Policy, please contact us
                    at{" "}
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

export default PrivacyPage;