"use client";
import Input from "@/components/Input";
import React, { useState } from "react";
import InvoiceItem from "./invoice-items";
import useItem from "@/hooks/useItem";
import { formatNumber } from "@/utils";

type Details = {
  invoice_number: string;
  bill_from: string;
  bill_to: string;
  date: string;
  due_date: string;
  notes: string;
  discount: number;
};

function Form() {
  const { Items, setItems, addNewItem, removeItem, totalPrice } = useItem();
  const [Details, setDetails] = useState<Details>({
    invoice_number: "",
    bill_from: "",
    bill_to: "",
    date: "",
    due_date: "",
    notes: "",
    discount: 0,
  });
  console.log(Details);

  const formatTotal = formatNumber(totalPrice());

  const onChangeDetails = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDetails({ ...Details, [event.target.name]: event.target.value });
  };

  return (
    <div className="w-full">
      <div className="flex flex-row">
        <Input
          onChange={(e) => onChangeDetails(e)}
          value={Details?.invoice_number}
          placeholder="#0001"
          title="Invoice Number"
          name="invoice_number"
          type="text"
        />
      </div>
      <div className="flex flex-row mt-4">
        <Input
          onChange={(e) => onChangeDetails(e)}
          value={Details?.bill_from}
          placeholder="Company, depok street no 77."
          title="Your company details"
          name="bill_from"
          type="text-area"
        />
        <div className="mx-4" />
        <Input
          onChange={(e) => onChangeDetails(e)}
          value={Details?.bill_to}
          placeholder="Company, ciracas street no 145."
          title="Bill to"
          name="bill_to"
          type="text-area"
        />
      </div>
      <div className="flex flex-row mt-4">
        <Input
          onChange={(e) => onChangeDetails(e)}
          title="Date issued"
          type="date"
          name="date"
        />
        <div className="mx-4" />
        <Input
          onChange={(e) => onChangeDetails(e)}
          title="Due date"
          type="date"
          name="due_date"
        />
      </div>
      {/* items */}
      <div className="bg-gray-200 mt-8 rounded p-4">
        {/* form grup */}
        {Items.map((item, index) => {
          return (
            <InvoiceItem
              key={item.id}
              item={item}
              showHeader={index == 0 ? true : false}
              onChangeItem={setItems}
              onRemoveItem={() => removeItem(item.id)}
            />
          );
        })}
        <div className="w-full flex justify-center my-4">
          <button
            onClick={() => addNewItem()}
            className="font-semibold text-white bg-blue-600 rounded px-4 py-2"
          >
            Add Item
          </button>
        </div>
      </div>
      {/* end items */}
      <div className="flex flex-row items-start mt-4">
        <div className="w-1/2">
          <Input
            onChange={(e) => onChangeDetails(e)}
            value={Details?.notes}
            placeholder="Notes"
            title="Notes"
            type="text-area"
            name="notes"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-end items-end">
          <div className="flex flex-row items-center">
            <div className="font-semibold mr-6">Subtotal</div>
            <div className="font-bold text-2xl">{formatTotal}</div>
          </div>
          <div className="flex flex-row items-center py-3">
            <div className="font-semibold px-5">Discount</div>
            <Input
              onChange={(e) => onChangeDetails(e)}
              value={Details?.discount.toString()}
              placeholder="Discount"
              type="number"
              name="discount"
              styles="w-[120px]"
            />
          </div>
          <div className="flex flex-row items-center py-3">
            <div className="font-semibold text-blue-600">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
