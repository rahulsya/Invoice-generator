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
      {showHeader && (
        <div className="flex flex-row text-gray-500 mb-1">
          <div className="w-[400px] mr-3">Item</div>
          <div className="w-[200px] mr-3">Price</div>
          <div className="w-[100px] mr-3">Qty</div>
          <div className="w-[200px]">Total</div>
        </div>
      )}
      <div className="flex flex-row items-center mb-4">
        <Input
          name="name"
          placeholder="Product name"
          onChange={(e) => {
            setItem(e);
          }}
          type="text"
          value={item?.name}
          styles="w-[400px] mr-3"
        />
        <Input
          name="price"
          placeholder="Price"
          onChange={(e) => setItem(e)}
          type="number"
          value={item?.price.toString()}
          styles="w-[200px] mr-3"
        />
        <Input
          name="qty"
          placeholder="Qty"
          onChange={(e) => setItem(e)}
          type="number"
          value={item?.qty.toString()}
          styles="w-[100px] mr-3"
        />
        <Input
          name="qty"
          placeholder="Qty"
          onChange={(e) => setItem(e)}
          type="number"
          value={totalPrice.toString()}
          styles="w-[200px] mr-3"
          disable={true}
        />
        <button onClick={() => onRemoveItem()} className="pl-2">
          ✖
        </button>
      </div>
    </div>
  );
}

export default InvoiceItem;
