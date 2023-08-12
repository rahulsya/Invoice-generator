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

  const totalPrice = item?.price && item?.qty ? item.price * item.qty : 0;

  return (
    <div>
      <div className="flex flex-row items-center mb-4 text-sm">
        <div className="w-[400px] mr-3">
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
        <div className="w-[200px] mr-3">
          <Input
            name="price"
            placeholder="Price"
            onChange={(e) => setItem(e)}
            title={showHeader ? "Harga" : ""}
            type="number"
            value={item?.price.toString()}
          />
        </div>
        <div className="w-[100px] mr-3">
          <Input
            name="qtyRoll"
            placeholder="qtyRoll"
            onChange={(e) => setItem(e)}
            title={showHeader ? "Qty Roll" : ""}
            type="number"
            value={item?.qtyRoll.toString()}
          />
        </div>
        <div className="w-[100px] mr-3">
          <Input
            name="qty"
            placeholder="Qty"
            onChange={(e) => setItem(e)}
            title={showHeader ? "Qty Meter" : ""}
            type="number"
            value={item?.qty.toString()}
          />
        </div>
        <div className="w-[200px] mr-3">
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
