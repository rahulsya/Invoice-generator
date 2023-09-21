"use client";
import Input from "@/components/Input";
import React, { useEffect } from "react";
import InvoiceItem from "./invoice-items";
import { formatNumber, generateInvoice } from "@/utils";
import { Details, Item } from "@/@types/types";
import { invDetail } from "@/utils/detailInvoice";
import useDimensions from "@/hooks/useDimension";

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
  const { height, width } = useDimensions();
  const formatTotal = formatNumber(totalPrice());

  const onChangeDetails = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDetails({ ...Details, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (Details.invoice_number == "" || Details.invoice_number == null) {
      setDetails({ ...Details, invoice_number: generateInvoice() });
    }
  }, [Details, setDetails]);

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
        className="mt-2 rounded bg-blue-500 px-2 py-2 text-xs text-white"
      >
        GenerateNumber
      </button>
      <div className="mt-4 flex flex-row items-start">
        <div className="w-1/2">
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
            title="Nama Pelanggan"
            name="bill_to"
            type="text"
          />
        </div>
      </div>
      <div className="mt-4 flex w-1/4 flex-row">
        <Input
          onChange={(e) => onChangeDetails(e)}
          title="Tanggal"
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
      <div className="mt-8 rounded bg-gray-100 p-4">
        {/* form grup */}
        {Items.map((item, index) => {
          const currentWidth = width;
          const showHeader =
            currentWidth < 1024 ? true : index == 0 ? true : false;
          return (
            <InvoiceItem
              key={item.id}
              item={item}
              showHeader={showHeader}
              onChangeItem={setItems}
              onRemoveItem={() => removeItem(item.id)}
            />
          );
        })}
        <div className="my-4 flex w-full justify-center">
          <button
            onClick={() => addNewItem()}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Add Item
          </button>
        </div>
      </div>
      {/* end items */}
      <div className="mt-12 flex flex-row items-start">
        <div className="w-1/2">
          {/* <Input
            onChange={(e) => onChangeDetails(e)}
            value={Details?.notes}
            placeholder="Notes"
            title="Notes"
            type="text-area"
            name="notes"
          /> */}
        </div>
        <div className="flex w-1/2 flex-row items-center justify-end text-sm">
          <div className="pr-4 font-semibold text-gray-500">
            <div className="pb-2">Sub Total</div>
            {/* <div className="pb-2">Discount</div> */}
            <div className="pt-3 text-blue-600">Total</div>
          </div>
          <div className="items-end text-end">
            <div className="pb-2 text-lg font-bold">{formatTotal}</div>
            <div className="pt-2 text-lg text-blue-600">{formatTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
