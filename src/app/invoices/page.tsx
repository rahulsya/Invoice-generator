"use client";
import React, { useState } from "react";
import Form from "./form";
import Preview from "./preview";
import useItem from "@/hooks/useItem";
import useDetail from "@/hooks/useDetail";

function Invoices() {
  const { Items, setItems, addNewItem, removeItem, totalPrice, saveItems } =
    useItem(
      localStorage.getItem("items")
        ? JSON.parse(localStorage.getItem("items") || "")
        : []
    );
  const { Details, setDetails, saveDetails } = useDetail(
    localStorage.getItem("detail")
      ? JSON.parse(localStorage.getItem("detail") || "")
      : {
          invoice_number: "",
          bill_from: "",
          bill_to: "",
          date: "",
          due_date: "",
          notes: "",
          discount: 0,
        }
  );

  const [toggleForm, setToggleForm] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          saveItems();
          saveDetails();
        }}
        className="py-2 px-6 rounded-lg bg-blue-800 text-white mb-4"
      >
        Save
      </button>
      <button
        onClick={() => setToggleForm((state) => !state)}
        className="py-2 px-6 rounded-lg bg-white text-blue-800 mb-4"
      >
        Toggle Form
      </button>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {!toggleForm && (
          <div className="w-full min-h-screen lg:w-1/2 bg-white rounded-xl px-12 pt-6">
            <Form
              addNewItem={addNewItem}
              removeItem={removeItem}
              Items={Items}
              totalPrice={totalPrice}
              setItems={setItems}
              setDetails={setDetails}
              Details={Details}
            />
          </div>
        )}
        <div
          className={`w-full min-h-screen ${
            toggleForm ? "w-full" : "lg:w-1/2 ml-4"
          }  mt-4 lg:mt-0 bg-white rounded-xl p-12`}
        >
          <Preview totalPrice={totalPrice} Items={Items} Details={Details} />
        </div>
      </div>
    </div>
  );
}

export default Invoices;
