import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React from "react";

function Setting() {
  return (
    <div className="flex flex-col gap-2 px-3">
      <div>
        <div className="text-lg font-semibold">Settings.</div>
        <div className="text-xs text-gray-500">
          Customize data like logo, bank account, appliacation name and ect.
        </div>
      </div>

      <div className="rounded-md border p-4">
        <div className="flex flex-col gap-4">
          <div className="">
            <div className="text-sm font-bold">Application</div>
            <Input type="email" placeholder="Application Name" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold">Invoice Logo</div>
            <Image
              width={300}
              alt="NextUI hero Image"
              src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            />
            <Input type="file" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold">Address</div>
            <Textarea placeholder="Address" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold">Bank Account</div>
            <Input type="text" label="Bank Account Name" />
            <Input type="number" label="Bank Account Number" />
          </div>
          <div className="flex justify-end">
            <Button color="primary">Save Configurations</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
