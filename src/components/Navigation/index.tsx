import React from "react";

function Navigation() {
  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-8 py-4 mb-4 drop-shadow-xl">
      <div className="text-lg font-semibold">Invoices</div>
      <div className="flex ">
        {/* <div className="mx-3 px-4 py-2 bg-blue-800 rounded-lg cursor-pointer">
          Preview
        </div>
        <div className="px-4 py-2 bg-white rounded-lg text-blue-800 cursor-pointer">
          Download
        </div> */}
      </div>
    </div>
  );
}

export default Navigation;
