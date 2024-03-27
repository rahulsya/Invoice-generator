"use client";
import { Settings } from "@/@types/types";
import { storeImage, getSettings, saveSetting } from "@/firebase/settings";
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
      setSettings({ ...data, logo: null });
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

  const saveConfiguration = async () => {
    const { logo, ...restSettings } = settings;
    await saveSetting({
      application_name: restSettings.application_name,
      address: restSettings.address,
      bank_name: restSettings.bank_name,
      bank_account_number: restSettings.bank_account_number,
      phone_number: restSettings.phone_number,
      logo_url: restSettings.logo_url,
    });

    if (logo != null) {
      await storeImage(logo, settings);
    }
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
