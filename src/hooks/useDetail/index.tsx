"use cliet";
import { Details } from "@/@types/types";
import React, { useState } from "react";

export default function useDetail(detail: Details) {
  const [Details, setDetails] = useState<Details>(detail);

  const saveDetails = () => {
    localStorage.setItem("detail", JSON.stringify(Details));
  };

  return {
    Details,
    setDetails,
    saveDetails,
  };
}
