import React from "react";
import { BackButton, ScrollToTop } from "../NavLinks/HomePage/Components";
import { useTheme } from "../NavLinks/Theme/ThemeContext";

const TermsOfService = () => {
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
      <ScrollToTop />
      <div className="container mx-auto px-4 pb-8 pt-32 max-[550px]:pt-40 max-sm:mx-2">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <div className="prose">
          <h2 className="text-xl font-bold py-4">1. Introduction</h2>
          <p style={{ color: `var(--gray-color)` }}>
            Welcome to ComfyStore. These Terms of Service govern your use of our
            website, located at{" "}
            <a href="" className="underline">
              https://gnapikam-comfycloth.netlify.app/
            </a>
            , and any related services provided by us.
          </p>
          <h2 className="text-xl font-bold py-4">
            2. Interpretation and Definitions
          </h2>
          <p style={{ color: `var(--gray-color)` }}>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <h2 className="text-xl font-bold py-4">3. Eligibility</h2>
          <p style={{ color: `var(--gray-color)` }}>
            By using our website and agreeing to these Terms of Service, you
            warrant that you are at least 18 years of age or have the legal
            capacity to enter into a binding contract in your jurisdiction.
          </p>
          <h2 className="text-xl font-bold py-4">4. Accounts</h2>
          <p style={{ color: `var(--gray-color)` }}>
            When you create an account with us, you must provide us with
            accurate, complete, and current information at all times. Failure to
            do so constitutes a breach of the Terms, which may result in
            immediate termination of your account on our website.
          </p>
          <h2 className="text-xl font-bold py-4">5. Intellectual Property</h2>
          <p style={{ color: `var(--gray-color)` }}>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of ComfyStore and its
            licensors. The Service is protected by copyright, trademark, and
            other laws of both the India and foreign countries.
          </p>
          <div className="pt-6 flex items-center">
            <div className="text-green-500 text-xl">
              <ion-icon name="checkmark-circle"></ion-icon>
            </div>
            <span
              className="flex items-center mb-2 pl-2"
              style={{ color: `var(--gray-color)` }}
            >
              You must be at least 18 years of age to use this website. By using
              this website and by agreeing to these terms and conditions you
              warrant and represent that you are at least 18 years of age.
            </span>
          </div>
          <div className="flex items-center">
            <div className="text-green-500 text-xl">
              <ion-icon name="checkmark-circle"></ion-icon>
            </div>
            <span
              className="flex items-center mb-2 pl-2"
              style={{ color: `var(--gray-color)` }}
            >
              Our store reserves the right to refuse service to anyone for any
              reason at any time.
            </span>
          </div>
          <div className="flex items-center">
            <div className="text-green-500 text-xl">
              <ion-icon name="checkmark-circle"></ion-icon>
            </div>
            <span
              className="flex items-center mb-2 pl-2"
              style={{ color: `var(--gray-color)` }}
            >
              Prices for our products are subject to change without notice.
            </span>
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default TermsOfService;
