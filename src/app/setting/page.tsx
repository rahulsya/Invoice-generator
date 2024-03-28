"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import useSettings from "@/hooks/useSettings";
import { getSettings } from "@/firebase/settings";
import { Settings } from "@/@types/types";

function Setting() {
  const {
    settings,
    setSettings,
    onSetSetting,
    onSetFileSetting,
    saveConfiguration,
  } = useSettings();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataSetting();
  }, []);

  const getDataSetting = async () => {
    const data = await getSettings();
    if (data) {
      setSettings(data as Settings);
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onSetSetting(event.target.name, event.target.value);
  };

  const onSave = async () => {
    setLoading(true);
    await saveConfiguration();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 px-3">
      <div>
        <div className="text-lg font-semibold">Settings.</div>
        <div className="text-xs text-gray-500">
          Customize data like logo, bank account, appliacation name and ect.
        </div>
      </div>

      <div className="rounded-md border p-6">
        <div className="flex flex-col gap-4">
          <div className="">
            <div className="text-sm font-bold">Application</div>
            <Input
              value={settings.application_name}
              type="text"
              name="application_name"
              placeholder="Application Name"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold">Invoice Logo</div>
            <Image
              width={100}
              height={100}
              alt="invoice_logo"
              src={settings.logo_url}
            />
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files?.length) {
                  onSetFileSetting(e.target.files[0]);
                }
              }}
              accept="image/*"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold">Address</div>
            <Textarea
              value={settings.address}
              placeholder="Address"
              name="address"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold">Phone Number</div>
            <Input
              type="text"
              label="Phone Number"
              name="phone_number"
              value={settings.phone_number}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold">Bank Account</div>
            <Input
              type="text"
              label="Bank Account Name"
              name="bank_name"
              value={settings.bank_name}
              onChange={(e) => onChange(e)}
            />
            <Input
              type="number"
              label="Bank Account Number"
              name="bank_account_number"
              value={settings.bank_account_number}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              isLoading={loading}
              onClick={() => onSave()}
              color="primary"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
