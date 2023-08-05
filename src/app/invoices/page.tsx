import React from "react";
import Form from "./form";

function Invoices() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full h-screen lg:w-1/2 bg-white rounded-xl">form</div>
      <div className="w-full min-h-screen lg:w-1/2  lg:mx-12 bg-white rounded-xl mt-4 lg:mt-0 p-12">
        <Form />
      </div>
    </div>
  );
}

export default Invoices;
