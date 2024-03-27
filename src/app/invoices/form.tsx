"use client";
import Input from "@/components/Input";
import React from "react";
import InvoiceItem from "./invoice-items";
import { formatNumber } from "@/utils";
import { Details, Item, Settings } from "@/@types/types";
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
  // setting
  settings: Settings;
};

function Form({
  Items,
  totalPrice,
  setItems,
  removeItem,
  addNewItem,
  Details,
  setDetails,
  settings,
}: IProps) {
  const { width } = useDimensions();
  const formatTotal = formatNumber(totalPrice());

  const onChangeDetails = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDetails({ ...Details, [event.target.name]: event.target.value });
  };

  return (
    <div className="w-full text-sm">
      <div className="flex flex-row">
        <Input
          disable={true}
          onChange={(e) => onChangeDetails(e)}
          value={Details?.invoice_number}
          placeholder="#0001"
          title="Invoice Number"
          name="invoice_number"
          type="text"
        />
      </div>
      <div className="mt-4 flex flex-col items-center lg:flex-row">
        <div className="w-full lg:w-1/2">
          <div className="text-sm font-semibold">
            {settings.application_name}
          </div>
          <div>{settings.address}</div>
          <div>{settings.phone_number}</div>
        </div>
        <div className="mt-4 w-full lg:mt-0 lg:w-1/2">
          <Input
            onChange={(e) => onChangeDetails(e)}
            value={Details?.bill_to}
            placeholder="Nama Pelanggan"
            title="Nama Pelanggan"
            name="bill_to"
            type="text"
          />
          <div className="my-2"></div>
          <Input
            onChange={(e) => onChangeDetails(e)}
            value={Details?.date}
            title="Tanggal"
            type="date"
            name="date"
          />
        </div>
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
        <div className="w-1/2"></div>
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
