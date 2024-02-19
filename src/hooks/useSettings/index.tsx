"use client";
import { Settings } from "@/@types/types";
import { useState } from "react";

function useSettings() {
  const defaultSettings = {
    application_name: "Flyover Sticker",
    logo_url: "",
    address: "",
    bank_name: "",
    bank_account_number: "",
  };
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  return {
    settings,
  };
}

export default useSettings;
