"use client";
import React, { useEffect, useState } from "react";
import Form from "./form";
import Preview from "./preview";
import useItem from "@/hooks/useItem";
import useDetail from "@/hooks/useDetail";
import Button from "@/components/button";
import { getInvoiceDetail, saveInvoice } from "@/firebase/store";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { generateInvoice } from "@/utils";

function FlyoverInvoice() {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);

  const onSaveInvoice = async () => {
    setLoading(true);
    const data = await saveInvoice({ ...Details, items: [...Items] });
    console.log(data);
    if (data) {
      router.push(`/flyover/invoices?inv=${data?.id}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    const { bill_to, date } = Details;
    const isEmptyField = [bill_to].includes("");
    if (Items.length > 0 && !isEmptyField) {
      SetSave(true);
      return;
    }
    SetSave(false);
  }, [Details, Items]);

  useEffect(() => {
    if (params?.get("inv")) {
      const invNo = `${params?.get("inv")}`;
      getInvoiceDetail(invNo)
        .then((response) => {
          if (response) {
            const { items, ...rest } = response;
            setDetails({ ...Details, ...rest });
            setItems([...items]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDetails({ ...Details, invoice_number: generateInvoice() });
    }
  }, [params]);

  return (
    <div>
      <div className="mb-4 flex flex-row flex-wrap gap-4 rounded-lg border p-4 shadow-md">
        {params?.get("inv") && (
          <Button
            type={`success`}
            title={"Buat Invoice Baru"}
            onClick={() => {
              resetItems();
              resetDetails();
              router.push(`/flyover/invoices`);
            }}
          />
        )}
        <Button
          type={`${save ? "primary" : "disabled"}`}
          disabled={!save || loading}
          title={loading ? "Processing..." : "Simpan"}
          onClick={() => {
            onSaveInvoice();
          }}
        />
        <Button
          type="secondary"
          title="Lihat Invoice"
          onClick={() => setToggleForm((state) => !state)}
        />
        {save && params?.get("inv") && (
          <a
            className="rounded-lg bg-yellow-800 px-6 py-2 text-sm text-white"
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
