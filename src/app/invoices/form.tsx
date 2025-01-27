"use client";
// import Input from "@/components/Input";
import React, { useState } from "react";
import InvoiceItem from "./invoice-items";
import { formatNumber } from "@/utils";
import { Details, Item, newItem, Settings } from "@/@types/types";
import useDimensions from "@/hooks/useDimension";
import AddItem from "./add-Item";
import EditItem from "./edit-item";
import { Input, useDisclosure } from "@nextui-org/react";

type IProps = {
  Items: Item[];
  totalPrice: () => number;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  removeItem: (id: number) => void;
  addNewItem: (item: newItem) => void;
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

  function onAddItem(item: newItem) {
    addNewItem(item);
  }

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Item>();

  function onUpdateItem(item: newItem) {
    setItems((state) => {
      const findItem = state.find((i) => i.id == selectedItem?.id);
      if (findItem) {
        const index = state.indexOf(findItem);
        state[index] = {
          ...state[index],
          ...item,
        };
      }
      return state;
    });
    onClose();
  }

  return (
    <div className="w-full text-sm">
      <div className="flex flex-row">
        <Input
          isDisabled
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
      <div className="mt-8">
        {/* form grup */}
        {Items.length == 0 && (
          <div className="justify-centerp-4 flex items-center  text-center">
            Item Belum Ditambahkan
          </div>
        )}
        {Items.map((item, index) => {
          return (
            <InvoiceItem
              key={item.id}
              item={item}
              onRemoveItem={() => removeItem(item.id)}
              onEditItem={() => {
                setSelectedItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  qty: item.qty,
                  unitType: item.unitType,
                  qtyRoll: 0,
                });
                onOpen();
              }}
            />
          );
        })}
        <EditItem
          intialData={selectedItem}
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          onEditItem={onUpdateItem}
        />
        <div className="my-4 flex w-full justify-center">
          <AddItem onAddItem={onAddItem} />
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
