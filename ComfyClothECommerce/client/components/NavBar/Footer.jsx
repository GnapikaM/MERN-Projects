import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (
    location.pathname === "/shippingReturns" ||
    location.pathname === "/FAQs" ||
    location.pathname === "/termsOfService" ||
    location.pathname === "/privacyPolicy" ||
    location.pathname === "/careers" ||
    location.pathname === "/contactUs" ||
    location.pathname === "/blog" ||
    location.pathname === "/blogPost" ||
    location.pathname === "/denimJacketStylingPage" ||
    location.pathname === "/sustainableFashionPage" ||
    location.pathname === "/styleGuide" ||
    location.pathname === "/lookbookContent" ||
    location.pathname === "/products" ||
    location.pathname === "/wishlist" ||
    location.pathname === "/bag" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/addAddress" ||
    location.pathname === "/addressPage" ||
    location.pathname === "/payments" ||
    location.pathname === "/orders" ||
    location.pathname === "/reviewForm" ||
    location.pathname === "/manageAccount" ||
    location.pathname === "/payments/success" ||
    location.pathname === "/payments/failure" ||
    /\/products\/[^/]+$/.test(location.pathname) ||
    location.pathname.startsWith("/orders/")
  ) {
    return null;
  }
  return (
    <footer className="relative bottom-0 left-0 right-0 bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contactUs" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shippingReturns" className="hover:text-gray-400">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/FAQs" className="hover:text-gray-400">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/termsOfService" className="hover:text-gray-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gray-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacyPolicy" className="hover:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-gray-400">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Subscribe to our Newsletter
            </h3>
            <p>Stay up to date with our latest news and promotions.</p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-700 text-gray-100"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-4 flex justify-between">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
