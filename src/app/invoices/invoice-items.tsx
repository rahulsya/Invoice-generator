import { Item, newItem } from "@/@types/types";
import { formatNumber } from "@/utils";
import { Button } from "@nextui-org/react";
import React from "react";

type IProps = {
  item?: Item;
  onRemoveItem: () => void;
  onEditItem: () => void;
};

function InvoiceItem({ item, onRemoveItem, onEditItem }: IProps) {
  const totalPrice =
    item?.price && (item?.qty || item.qtyRoll)
      ? item.price * (item.qty != 0 ? item.qty : item.qtyRoll)
      : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-b-gray-300 bg-gray-100 p-4">
        <div className="flex flex-col">
          <div className="text-md font-bold">{item?.name}</div>
          <div className="text-sm text-gray-500">
            {item?.qty} {item?.unitType} X {formatNumber(item?.price || 0)}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 lg:flex-row">
          <div className="text-md font-bold">
            {formatNumber(totalPrice || 0)}
          </div>
          <div className="flex gap-1">
            <Button size="sm" color="primary" onClick={() => onEditItem()}>
              Edit
            </Button>
            <Button size="sm" color="danger" onClick={() => onRemoveItem()}>
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceItem;
