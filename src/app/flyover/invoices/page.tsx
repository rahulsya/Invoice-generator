"use client";
import React, { useEffect, useState } from "react";
import Form from "./form";
import Preview from "./preview";
import useItem from "@/hooks/useItem";
import useDetail from "@/hooks/useDetail";

function FlyoverInvoice() {
  const {
    Items,
    setItems,
    addNewItem,
    removeItem,
    totalPrice,
    saveItems,
    resetItems,
  } = useItem();
  const { Details, setDetails, saveDetails, resetDetails } = useDetail();

  const [toggleForm, setToggleForm] = useState(false);

  useEffect(() => {
    setItems(
      localStorage.getItem("items")
        ? JSON.parse(localStorage.getItem("items") || "")
        : []
    );
    setDetails(
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
  }, []);

  const resetForm = () => {
    resetItems();
    resetDetails();
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap">
        <button
          onClick={() => {
            saveItems();
            saveDetails();
            alert("Data berhasil di simpan");
          }}
          className="py-2 px-6 rounded-lg bg-blue-800 text-white mb-4 mr-4"
        >
          Save
        </button>
        <button
          onClick={() => setToggleForm((state) => !state)}
          className="py-2 px-6 rounded-lg bg-white text-blue-800 mb-4"
        >
          Preview Invoice
        </button>
        <button
          onClick={() => resetForm()}
          className="py-2 px-6 rounded-lg bg-yellow-200 text-yellow-800 mb-4 ml-4"
        >
          Reset Data
        </button>
        <a
          className="py-2 px-6 rounded-lg bg-blue-800 text-white mb-4 mx-4"
          download
          href={`/api/pages.pdf?data=${JSON.stringify(
            Items
          )}&detail=${JSON.stringify(Details)}&summary_total=${JSON.stringify({
            total: totalPrice(),
            finalTotal: totalPrice() - Details.discount,
          })}&inv_number=${Details.invoice_number}`}
        >
          Download PDF
        </a>
      </div>
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
            toggleForm ? "w-full" : "lg:w-1/2 ml-0 lg:ml-4"
          }  mt-4 lg:mt-0 bg-white rounded-xl p-12`}
        >
          <Preview totalPrice={totalPrice} Items={Items} Details={Details} />
        </div>
      </div>
    </div>
  );
}

export default FlyoverInvoice;
