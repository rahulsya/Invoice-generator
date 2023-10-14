import { Item } from "@/@types/types";
import Input from "@/components/Input";
import React from "react";

type IProps = {
  item?: Item;
  showHeader?: boolean;
  onChangeItem: React.Dispatch<React.SetStateAction<Item[]>>;
  onRemoveItem: () => void;
};

function InvoiceItem({
  item,
  showHeader = true,
  onChangeItem,
  onRemoveItem,
}: IProps) {
  const setItem = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChangeItem((state) => {
      return state.map((product) => ({
        ...product,
        [event.target.name]:
          product.id === item?.id
            ? event.target.value
            : product[event.target.name as keyof Item],
      }));
    });
  };

  const totalPrice =
    item?.price && (item?.qty || item.qtyRoll)
      ? item.price * (item.qty != 0 ? item.qty : item.qtyRoll)
      : 0;

  return (
    <div>
      <div className="mb-4 flex w-full flex-col items-center text-sm lg:flex-row">
        <div className="w-full lg:mr-3 lg:w-[400px]">
          <Input
            name="name"
            placeholder="Product name"
            onChange={(e) => {
              setItem(e);
            }}
            title={showHeader ? "Nama Produk" : ""}
            type="text"
            value={item?.name}
          />
        </div>
        <div className="w-full lg:mr-3 lg:w-[200px]">
          <Input
            name="price"
            placeholder="Price"
            onChange={(e) => setItem(e)}
            title={showHeader ? "Harga" : ""}
            type="number"
            value={item?.price.toString()}
          />
        </div>
        <div className="w-full lg:mr-3 lg:w-[100px]">
          <Input
            name="qtyRoll"
            placeholder="qtyRoll"
            onChange={(e) => setItem(e)}
            title={showHeader ? "Qty Roll" : ""}
            type="number"
            value={item?.qtyRoll.toString()}
          />
        </div>
        <div className="w-full lg:mr-3 lg:w-[100px]">
          <Input
            name="qty"
            placeholder="Qty"
            onChange={(e) => setItem(e)}
            title={showHeader ? "Qty Meter" : ""}
            type="number"
            value={item?.qty.toString()}
          />
        </div>
        <div className="w-full lg:mr-3 lg:w-[200px]">
          <Input
            name="qty"
            placeholder="Qty"
            onChange={(e) => setItem(e)}
            title={showHeader ? "Total" : ""}
            type="number"
            value={totalPrice.toString()}
            disable={true}
          />
        </div>
        <button onClick={() => onRemoveItem()} className="pl-2">
          ✖
        </button>
      </div>
    </div>
  );
}

export default InvoiceItem;
