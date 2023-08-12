"use client";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import InvoiceItem from "./invoice-items";
import useItem from "@/hooks/useItem";
import { formatNumber, generateInvoice } from "@/utils";
import { Details, Item } from "@/@types/types";
import useDetail from "@/hooks/useDetail";
import { invDetail } from "@/utils/detailInvoice";

type IProps = {
  Items: Item[];
  totalPrice: () => number;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  removeItem: (id: number) => void;
  addNewItem: () => void;
  // details
  Details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
};

function Form({
  Items,
  totalPrice,
  setItems,
  removeItem,
  addNewItem,
  Details,
  setDetails,
}: IProps) {
  const formatTotal = formatNumber(totalPrice());
  const formatFinalTotal = formatNumber(totalPrice() - Details.discount);

  const onChangeDetails = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDetails({ ...Details, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (Details.invoice_number == "" || Details.invoice_number == null) {
      setDetails({ ...Details, invoice_number: generateInvoice() });
    }
  }, [Details]);

  // console.log(generateInvoice());

  const onRegenerateNumber = () => {
    setDetails({ ...Details, invoice_number: generateInvoice() });
  };

  return (
    <div className="w-full text-sm">
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
      <button
        onClick={() => onRegenerateNumber()}
        className="mt-2 py-2 px-2 bg-blue-500 text-white text-xs rounded"
      >
        GenerateNumber
      </button>
      <div className="flex flex-row mt-4 items-start">
        {/* <Input
          onChange={(e) => onChangeDetails(e)}
          value={Details?.bill_from}
          placeholder="Company Name, depok street no 77."
          title="Your company details"
          name="bill_from"
          type="text-area"
        /> */}
        <div className="w-1/2">
          <div>From : </div>
          <div className="text-sm font-semibold">{invDetail.storeName}</div>
          <div>{invDetail.storeAddress}</div>
          <div>
            {invDetail.phoneNumber} - {invDetail.phoneNumber2}
          </div>
        </div>
        <div className="mx-4" />

        <div className="w-1/2">
          <Input
            onChange={(e) => onChangeDetails(e)}
            value={Details?.bill_to}
            placeholder="Nama Pelanggan"
            title="Bill to"
            name="bill_to"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-row mt-4 w-1/4">
        <Input
          onChange={(e) => onChangeDetails(e)}
          title="Date issued"
          type="date"
          name="date"
        />
        {/* <div className="mx-4" />
        <Input
          onChange={(e) => onChangeDetails(e)}
          title="Due date"
          type="date"
          name="due_date"
        /> */}
      </div>
      {/* items */}
      <div className="bg-gray-100 mt-8 rounded p-4">
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
            className="font-semibold text-sm text-white bg-blue-600 rounded px-4 py-2"
          >
            Add Item
          </button>
        </div>
      </div>
      {/* end items */}
      <div className="flex flex-row items-start mt-12">
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
        <div className="w-1/2 flex flex-row justify-end items-center text-sm">
          <div className="pr-4 text-gray-500 font-semibold">
            <div className="pb-2">Sub Total</div>
            {/* <div className="pb-2">Discount</div> */}
            <div className="pt-4 text-blue-600">Total</div>
          </div>
          <div className="text-end items-end">
            <div className="font-bold text-lg pb-2">{formatTotal}</div>
            {/* <div>
              <Input
                onChange={(e) => onChangeDetails(e)}
                value={Details?.discount.toString()}
                placeholder="Discount"
                type="number"
                name="discount"
                styles="text-sm text-end"
              />
            </div> */}
            <div className="pt-3 text-lg text-blue-600">
              {formatFinalTotal ? formatFinalTotal : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
