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

  const [toggleForm, setToggleForm] = useState(false);
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
    const { bill_to, date } = Details;
    const isEmptyField = [bill_to].includes("");
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
  console.log(save);

  return (
    <div>
      <div className="mb-4 flex flex-row flex-wrap gap-4 rounded-lg border p-4 shadow-md">
        <Button
          type={`${save ? "primary" : "disabled"}`}
          disabled={!save}
          title="Save"
          onClick={() => {
            saveItems();
            saveDetails();
            alert("Data berhasil di simpan");
          }}
        />
        <Button
          type="secondary"
          title="Preview Invoice"
          onClick={() => setToggleForm((state) => !state)}
        />
        <Button type="warning" title="Reset Data" onClick={() => resetForm()} />
        {save && (
          <a
            className="rounded-lg bg-blue-800 px-6 py-2 text-sm text-white"
            // download
            href={`/api/pages.pdf?data=${JSON.stringify(
              Items
            )}&detail=${JSON.stringify(Details)}&summary_total=${JSON.stringify(
              {
                total: totalPrice(),
                finalTotal: totalPrice() - Details.discount,
              }
            )}&inv_number=${Details.invoice_number}`}
          >
            Download PDF
          </a>
        )}
      </div>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div
          className={`min-h-screen w-full rounded-xl border bg-white px-5 pt-6 shadow-md lg:px-12 ${
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
            className={`ml-0 mt-4 min-h-screen w-full rounded-xl border bg-white
             p-12 shadow-md lg:ml-4 lg:mt-0 lg:w-1/2`}
          >
            <Preview totalPrice={totalPrice} Items={Items} Details={Details} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FlyoverInvoice;
