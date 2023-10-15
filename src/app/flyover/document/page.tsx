"use client";
import React, { useEffect, useState } from "react";

import { getAllInvoices } from "@/firebase/store";
import { Invoice } from "@/models/invoices";

import Link from "next/link";

function Document() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    getAllInvoices()
      .then((data) => {
        setloading(false);
        setInvoices(data || []);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="px-5 pt-5">
      <div className="text-lg font-bold">Invoices </div>
      <div className="text-sm text-gray-500">List History Data invoice</div>
      {loading && (
        <div className="mt-4 text-sm font-semibold text-gray-600">
          Loading Data....
        </div>
      )}

      <div className="mt-4 grid cursor-pointer grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4">
        {invoices.length > 0 &&
          invoices.map((item, index: number) => {
            return (
              <Link
                href={`/flyover/invoices?inv=${item.invoice_number}`}
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
    </div>
  );
}

export default Document;
