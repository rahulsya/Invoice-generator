"use client";
import { Settings } from "@/@types/types";
import { useEffect, useState } from "react";

function useSettings() {
  const defaultSettings = {
    application_name: "Flyover Sticker",
    logo_url: "",
    logo: null,
    file_name: "",
    address: "Jl.Maruti No.20 - Denpasar(Depan Pom Bensin)",
    bank_name: "BCA, Juli Iskandar",
    bank_account_number: "4350218039",
    phone_number: "0852 3765 3892 - 0812 3859 2016",
  };

  const [settings, setSettings] = useState<Settings>({
    application_name: "",
    logo_url: "",
    logo: null,
    file_name: "",
    address: "",
    bank_name: "",
    bank_account_number: "",
    phone_number: "",
  });

  useEffect(() => {
    const setting = localStorage.getItem("settings");
    if (setting) {
      const data = JSON.parse(setting);
      setSettings(data);
    } else {
      setSettings(defaultSettings);
    }
  }, []);

  const onSetSetting = (key: string, value: string) => {
    setSettings((prevState) => ({ ...prevState, [key]: value }));
  };

  const onSetFileSetting = (file: File) => {
    setSettings((state) => ({
      ...state,
      logo_url: URL.createObjectURL(file),
      logo: file,
      file_name: file.name,
    }));
  };

  const saveConfiguration = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
  };

  return {
    settings,
    setSettings,
    onSetSetting,
    onSetFileSetting,
    saveConfiguration,
  };
}

export default useSettings;
