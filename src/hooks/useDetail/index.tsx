"use cliet";
import { Details } from "@/@types/types";
import { useState } from "react";

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
    console.log("save ", Details);

    localStorage.setItem("detail", JSON.stringify(Details));
  };

  const resetDetails = () => {
    setDetails({
      invoice_number: "",
      bill_from: "",
      bill_to: "",
      date: "",
      due_date: "",
      notes: "",
      discount: 0,
    });
    localStorage.setItem(
      "detail",
      JSON.stringify({
        invoice_number: "",
        bill_from: "",
        bill_to: "",
        date: "",
        due_date: "",
        notes: "",
        discount: 0,
      })
    );
  };

  return {
    Details,
    setDetails,
    saveDetails,
    resetDetails,
  };
}
