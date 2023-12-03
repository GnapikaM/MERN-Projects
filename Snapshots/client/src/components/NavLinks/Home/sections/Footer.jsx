import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">Additional navigation links.</p>
        <p className="text-sm">
          &copy; 2023 Snapshots Website. All rights reserved.
        </p>
        <p className="text-sm">Privacy policy and terms of service links.</p>
      </div>
    </footer>
  );
};

export default Footer;
