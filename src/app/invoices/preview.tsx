"use client";
import React from "react";
import { Details, Item } from "@/@types/types";
import { formatNumber } from "@/utils";

type IProps = {
  Items: Item[];
  totalPrice: () => number;
  Details: Details;
};

function Preview({ Items, Details, totalPrice }: IProps) {
  const {
    bill_from,
    bill_to,
    invoice_number,
    notes,
    discount,
    due_date,
    date,
  } = Details;

  const formatTotal = formatNumber(totalPrice());
  const formatFinalTotal = formatNumber(totalPrice() - Details.discount);
  return (
    <div>
      {/* title header */}
      <div>
        <div className="text-xl font-bold">INVOICE</div>
        <div className="text-lg font-semibold text-blue-600 uppercase">
          # {invoice_number}
        </div>
      </div>
      {/* end title header */}

      {/* addres */}
      <div className="mt-12 flex flex-row">
        <div className="mr-12 text-sm">
          <div>From : </div>
          <div className="font-semibold">{bill_from.split(",")[0]}</div>
          <div className="w-[250px] ">{bill_from}</div>
        </div>
        <div className="text-sm">
          <div>To : </div>
          <div className="font-semibold">{bill_to.split(",")[0]}</div>
          <div className="w-[250px] text-sm">{bill_to}</div>
        </div>
      </div>
      {/* end address */}

      {/* items */}
      <table className="table-fixed w-full mt-12 text-sm">
        <thead className="py-12 bg-gray-200 rounded">
          <tr className="text-gray-600 ">
            <th className="text-start px-4 py-4">Item Name</th>
            <th className="text-start px-4 py-4">Price</th>
            <th className="text-start px-4 py-4">Qty</th>
            <th className="text-start px-4 py-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {Items.map((item) => (
            <tr key={item.id} className="border">
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">{formatNumber(item.price)}</td>
              <td className="px-4 py-3">{item.qty}</td>
              <td className="px-4 py-3">
                {formatNumber(item.price * item.qty)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* end items */}

      {/* total */}
      <div className="flex flex-row justify-end mt-4 items-center text-sm">
        <div className="text-gray-500 mr-12 font-semibold space-y-2">
          <div>Sub Total</div>
          <div>Discount</div>
          <div>Total</div>
        </div>
        <div className="text-end font-bold space-y-2">
          <div>{formatTotal}</div>
          <div>{discount ? `- ${formatNumber(discount)}` : "-"}</div>
          <div>{formatFinalTotal}</div>
        </div>
      </div>
      {/* end Total */}

      {/* notes */}
      <div className="text-gray-500 text-sm font-bold">Notes</div>
      <div className="text-sm py-2">{notes}</div>
      {/* end notes */}

      <div className="bg-blue-500 p-12 text-white text-sm rounded mt-12 w-full">
        <div className="flex flex-row justify-between">
          <div>
            <div className="font-bold py-2">Invoice Details</div>
            <div>Date issued : {date}</div>
            <div>Due Date : {due_date}</div>
          </div>
          <div>
            <div className="font-bold py-2 text-end">Total Amount</div>
            <div className="text-2xl">{formatFinalTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
