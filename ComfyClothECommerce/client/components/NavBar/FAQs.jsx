import React, { useState } from "react";
import { BackButton } from "../NavLinks/HomePage/Components";
import { useTheme } from "../NavLinks/Theme/ThemeContext";

const faqs = [
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free standard shipping on all orders over $50 within the United States.",
  },
  {
    question: "How can I return an item?",
    answer:
      "We accept returns within 30 days of purchase. Please contact our customer service team for assistance.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and Apple Pay for online purchases.",
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "Delivery times vary depending on your location and the shipping method chosen. Standard shipping typically takes 3-7 business days within the United States.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, you will receive a tracking number via email once your order has been shipped. You can use this tracking number to monitor the status of your delivery.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to select countries. Please note that additional fees and import taxes may apply.",
  },
  {
    question: "What is your return policy for sale items?",
    answer:
      "Sale items are eligible for exchange or store credit only, within 14 days of purchase. They must be unworn, unwashed, and in original condition with tags attached.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support team via email at support@example.com or by phone at 1-800-123-4567. Our support hours are Monday to Friday, 9am to 5pm EST.",
  },
];

const FAQs = () => {
  const { theme } = useTheme();
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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
      <div className="max-w-3xl mx-auto pb-8 pt-32 max-[550px]:pt-40 max-sm:mx-2">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight mb-8">
            Frequently Asked Questions
          </h2>
          <div className="divide-y">
            {faqs.map((faq, index) => (
              <div key={index} className="w-[640px] max-sm:w-[400px] max-[400px]:w-full">
                <button
                  className="flex justify-between w-full py-4 text-lg font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{faq.question}</span>
                  <div className="text-2xl">
                    <ion-icon
                      name="chevron-down-circle"
                      style={{ transition: "transform 0.3s ease" }}
                      aria-hidden="true"
                    ></ion-icon>
                  </div>
                </button>
                {openQuestionIndex === index && (
                  <div className="py-2">
                    <p className="text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default FAQs;
