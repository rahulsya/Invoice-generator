"use client";
import { Item, newItem } from "@/@types/types";
import { useState } from "react";

function useItem() {
  const [Items, setItems] = useState<Item[]>([]);

  const addNewItem = (item: newItem) => {
    let data = {
      id: Items.length + 1,
      name: item?.name ?? "",
      price: item.price ?? 0,
      qty: item.qty ?? 0,
      qtyRoll: 0,
      unitType: item.unitType ?? "Meter",
    };
    setItems((state) => [...state, data]);
  };

  const removeItem = (id: number) => {
    const item = Items.filter((item) => item.id != id);
    setItems(item);
  };

  const totalPrice = () => {
    return Items.reduce(
      (acc, curr) =>
        acc + curr.price * (curr.qty != 0 ? curr.qty : curr.qtyRoll),
      0
    );
  };

  const saveItems = () => {
    localStorage.setItem("items", JSON.stringify(Items));
  };

  const resetItems = () => {
    setItems([]);
    localStorage.setItem("items", JSON.stringify([]));
  };

  return {
    Items,
    setItems,
    addNewItem,
    removeItem,
    totalPrice,
    saveItems,
    resetItems,
  };
}

export default useItem;
