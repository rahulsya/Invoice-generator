"use client";
import React, { useEffect, useState } from "react";

import { getAllInvoices } from "@/firebase/store";
import { Invoice } from "@/models/invoices";

import Link from "next/link";
import Button from "@/components/button";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { log } from "console";

function Document() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [lastVisibleData, SetlastVisibleData] =
    useState<QueryDocumentSnapshot<Invoice, DocumentData>>();
  const [loading, setloading] = useState(false);
  const [disableNextPageButton, setDisableNextPageButton] = useState(false);

  useEffect(() => {
    getInvoices();
  }, []);

  const handleNextFetch = async () => {
    try {
      setloading(true);
      const newDataInvoices = await getAllInvoices(true, lastVisibleData);
      if (newDataInvoices) {
        setloading(false);
        if (
          !newDataInvoices.data.length &&
          newDataInvoices.lastVisible == undefined
        ) {
          setDisableNextPageButton(true);
        }
        setInvoices((state) => [...state, ...newDataInvoices.data]);
        SetlastVisibleData(newDataInvoices.lastVisible);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  const getInvoices = async () => {
    try {
      setloading(true);
      let response = await getAllInvoices();
      if (response) {
        setloading(false);
        SetlastVisibleData(response?.lastVisible);
        setInvoices(response?.data || []);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  return (
    <div className="px-5 pt-5">
      <div className="text-lg font-bold">Invoices </div>
      <div className="text-sm text-gray-500">List History Data invoice</div>

      <div className="mt-4 grid cursor-pointer grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4">
        {invoices.length > 0 &&
          invoices.map((item, index: number) => {
            return (
              <Link
                href={`/invoices?inv=${item.invoice_number}`}
                key={index}
                className="rounded-lg border p-6 shadow-lg hover:bg-gray-100"
              >
                <div className="flex flex-col ">
                  <div className="font-semibold">{item.invoice_number}</div>
                  <div className="text-sm text-gray-500">
                    {item.date || "-"}
                  </div>
                </div>
                <div className="pt-4 text-sm font-semibold text-blue-500">
                  <div className="text-gray-600">Invoice : </div> {item.bill_to}{" "}
                  ({item.items.length || 0} items)
                </div>
              </Link>
            );
          })}
      </div>

      {loading && (
        <div className="mt-4 text-center text-sm font-semibold text-blue-600">
          Loading Data....
        </div>
      )}
      <div className="bg-gray-20 mt-4 flex justify-end gap-4">
        <Button
          disabled={disableNextPageButton ? disableNextPageButton : loading}
          title="Next"
          type={disableNextPageButton || loading ? "disabled" : "primary"}
          onClick={() => handleNextFetch()}
        />
      </div>
    </div>
  );
}

export default Document;
