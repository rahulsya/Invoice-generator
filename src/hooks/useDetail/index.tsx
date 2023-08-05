"use cliet";
import { Details } from "@/@types/types";
import React, { useState } from "react";

export default function useDetail() {
  const [Details, setDetails] = useState<Details>({
    invoice_number: "",
    bill_from: "",
    bill_to: "",
    date: "",
    due_date: "",
    notes: "",
    discount: 0,
  });

  const saveDetails = () => {
    localStorage.setItem("detail", JSON.stringify(Details));
  };

  return {
    Details,
    setDetails,
    saveDetails,
  };
}
