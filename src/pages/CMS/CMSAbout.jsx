import { useState } from "react";
import { Table } from "antd";

const CMSAbout = () => {
  return (
    <div>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <p className="text-[#ffffff] font-title text-3xl font-bold">
          CMS - About
        </p>
      </div>

      <div className="mt-8">
        <p className="text-lg text-gray-600">About Page Content Management...</p>
      </div>
    </div>
  );
};

export default CMSAbout;