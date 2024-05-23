import React from "react";
import { useTheme } from "../NavLinks/Theme/ThemeContext";
import { BackButton } from "../NavLinks/HomePage/Components";

const PrivacyPolicy = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark" ? "dark-theme" : "light-theme"
      } flex justify-center items-center`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      <div className="pb-8 pt-32 max-[550px]:pt-40">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto shadow-md rounded-md p-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4" style={{color: `var(--text-color)`}}>
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit or make a purchase from
              our website.
            </p>
            <p className="mb-4" style={{color: `var(--text-color)`}}>
              Personal information we collect includes your name, email address,
              shipping address, payment information, and phone number. We
              collect this information in order to process your orders,
              communicate with you, and provide you with the best possible
              service.
            </p>
            <p className="mb-4" style={{color: `var(--text-color)`}}>
              Your personal information may be shared with third-party service
              providers who assist us in fulfilling orders, processing payments,
              and delivering products to you. We may also share your information
              to comply with applicable laws and regulations, to respond to
              lawful requests and legal process, or to protect our rights,
              privacy, safety, or property, or that of you or others.
            </p>
            <p className="mb-4" style={{color: `var(--text-color)`}}>
              We are committed to protecting the security of your personal
              information and take reasonable precautions to safeguard it.
              However, no method of transmission over the internet, or method of
              electronic storage, is 100% secure. Therefore, while we strive to
              use commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
            <p className="mb-4" style={{color: `var(--text-color)`}}>
              By using our website, you consent to the collection and use of
              your personal information as described in this Privacy Policy. We
              may update this Privacy Policy from time to time, so please review
              it periodically for changes.
            </p>
            <p className="mb-4" style={{color: `var(--text-color)`}}>
              If you have any questions about this Privacy Policy, or if you
              would like to access, correct, amend, or delete any personal
              information we have about you, please contact us at
              privacy@example.com.
            </p>
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
