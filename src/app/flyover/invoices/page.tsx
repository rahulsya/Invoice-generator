"use client";
import React, { useEffect, useState, useCallback } from "react";
import Form from "./form";
import Preview from "./preview";
import useItem from "@/hooks/useItem";
import useDetail from "@/hooks/useDetail";
import Button from "@/components/button";

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

  const [toggleForm, setToggleForm] = useState(true);
  const [save, SetSave] = useState(false);

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

  useEffect(() => {
    console.log("caled");

    const { bill_to, date } = Details;
    const isEmptyField = [bill_to, date].includes("");
    if (Items.length > 0 && !isEmptyField) {
      SetSave(true);
      return;
    }
    SetSave(false);
  }, [Details, Items]);

  const resetForm = () => {
    resetItems();
    resetDetails();
  };

  return (
    <div>
      <div className="mb-4 flex flex-row">
        <Button
          type={`${save ? "primary" : "disabled"}`}
          title="Save"
          className="mr-4"
          onClick={() => {
            saveItems();
            saveDetails();
            alert("Data berhasil di simpan");
          }}
        />
        <Button
          type="secondary"
          title="Preview Invoice"
          className="mr-4"
          onClick={() => setToggleForm((state) => !state)}
        />
        <Button type="warning" title="Reset Data" onClick={() => resetForm()} />
        <a
          className="mx-4 rounded-lg bg-blue-800 px-6 py-2 text-white"
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
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div
          className={`min-h-screen w-full rounded-xl bg-white px-12 pt-6 ${
            toggleForm ? "w-full" : "lg:w-1/2"
          } `}
        >
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
        {!toggleForm && (
          <div
            className={`ml-0 mt-4  min-h-screen w-full rounded-xl
             bg-white p-12 lg:ml-4 lg:mt-0 lg:w-1/2`}
          >
            <Preview totalPrice={totalPrice} Items={Items} Details={Details} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FlyoverInvoice;
