"use client";
import React from "react";
import { Details, Item, Settings } from "@/@types/types";
import { formatNumber } from "@/utils";
import Image from "next/image";
import { invDetail } from "@/utils/detailInvoice";

type IProps = {
  Items: Item[];
  totalPrice: () => number;
  Details: Details;
  settings: Settings;
};

function Preview({ Items, Details, totalPrice, settings }: IProps) {
  const { bill_to, invoice_number, date } = Details;

  const formatTotal = formatNumber(totalPrice());
  const formatFinalTotal = formatNumber(totalPrice() - Details.discount);
  return (
    <div>
      {/* title header */}
      <div className="flex flex-row items-center justify-between">
        <div>
          <div className="text-xl font-bold">INVOICE</div>
          <div className="text-sm font-semibold uppercase text-blue-600 lg:text-lg">
            # {invoice_number}
          </div>
        </div>
        <Image
          alt="Flyover logo"
          width={150}
          height={150}
          src={settings.logo_url}
          priority
        />
      </div>
      {/* end title header */}

      {/* addres */}
      <div className="mt-0 flex w-full flex-col-reverse gap-4 md:mt-10 lg:flex-row">
        <div className="text-sm">
          <div className="text-sm font-semibold">
            {settings.application_name}
          </div>
          <div>{settings.address}</div>
          <div>{settings.phone_number}</div>
        </div>
        <div className="text-sm">
          <div>Pelanggan : </div>
          {bill_to && <div className="text-sm font-semibold">{bill_to}</div>}
        </div>
      </div>
      {/* end address */}

      {/* items */}
      <table className="mt-4 w-full table-fixed text-[10px] md:mt-12 md:text-sm">
        <thead className="rounded bg-gray-200 py-12">
          <tr className="text-gray-600">
            <th className="px-2 py-4 text-start md:px-4">Nama Produk</th>
            <th className="px-2 py-4 text-start md:px-4">Harga</th>
            <th className="px-2 py-4 text-start md:px-4">Qty</th>
            <th className="px-2 py-4 text-start md:px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {Items.map((item) => (
            <tr key={item.id} className="border">
              <td className=" break-words px-2 py-3 md:px-4">{item.name}</td>
              <td className="break-words px-2 py-3 md:px-4">
                {formatNumber(item.price)}
              </td>
              <td className="break-words px-2 py-3 md:px-4">
                {`${item.qty} ${item.unitType}`}
              </td>
              <td className="break-words px-2 py-3 md:px-4">
                {formatNumber(
                  item.price * (item.qty != 0 ? item.qty : item.qtyRoll)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* end items */}

      {/* total */}
      <div className="my-4 flex flex-row items-center justify-end text-xs md:text-sm">
        <div className="mr-12 space-y-2 font-semibold text-gray-500">
          <div>Sub Total</div>
          <div>Total</div>
        </div>
        <div className="space-y-2 text-end font-bold">
          <div>{formatTotal}</div>
          <div>{formatTotal}</div>
        </div>
      </div>
      {/* end Total */}

      {/* notes */}
      <div className="text-sm font-bold text-gray-500">
        *Informasi Pembayaran
      </div>
      <div className="py-2 text-sm font-semibold">
        <div>
          <span className="font-normal">Bank : </span>
          {settings.bank_name}
        </div>
        <div>
          <span className="font-normal">Nomor rekening : </span>
          {settings.bank_account_number}
        </div>
      </div>
      {/* end notes */}

      <div className="mt-4 w-full rounded bg-blue-500 p-4 text-sm text-white md:mt-12 lg:p-12">
        <div className="flex flex-col justify-between md:flex-row">
          <div>
            <div className="py-2 font-bold">Tanggal Invoice</div>
            <div>{date}</div>
          </div>
          <div>
            <div className="py-2 text-start font-bold md:text-end">
              Total Amount
            </div>
            <div className="text-md lg:text-2xl">{formatFinalTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
