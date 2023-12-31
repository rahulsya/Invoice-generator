"use client";
import { Item } from "@/@types/types";
import { useState } from "react";

function useItem() {
  const [Items, setItems] = useState<Item[]>([]);

  const addNewItem = () => {
    setItems((state) => [
      ...state,
      {
        id: Items.length + 1,
        name: "",
        price: 0,
        qty: 0,
        qtyRoll: 0,
        unitType: "Meter",
      },
    ]);
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
