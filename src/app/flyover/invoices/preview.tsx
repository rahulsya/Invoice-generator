"use client";
import React from "react";
import { Details, Item } from "@/@types/types";
import { formatNumber } from "@/utils";
import Image from "next/image";
import { invDetail } from "@/utils/detailInvoice";

type IProps = {
  Items: Item[];
  totalPrice: () => number;
  Details: Details;
};

function Preview({ Items, Details, totalPrice }: IProps) {
  const {
    bill_from,
    bill_to,
    invoice_number,
    notes,
    discount,
    due_date,
    date,
  } = Details;

  const formatTotal = formatNumber(totalPrice());
  const formatFinalTotal = formatNumber(totalPrice() - Details.discount);
  return (
    <div>
      {/* title header */}
      <div className="flex flex-row items-center justify-between">
        <div>
          <div className="text-xl font-bold">INVOICE</div>
          <div className="text-lg font-semibold uppercase text-blue-600">
            # {invoice_number}
          </div>
        </div>
        <Image
          alt="Flyover logo"
          width={150}
          height={150}
          src={"/logoFlyover.png"}
          priority
        />
      </div>
      {/* end title header */}

      {/* addres */}
      <div className="mt-10 flex flex-row">
        <div className="mr-12 text-sm">
          <div className="text-sm font-semibold">{invDetail.storeName}</div>
          <div>{invDetail.storeAddress}</div>
          <div>
            {invDetail.phoneNumber} - {invDetail.phoneNumber2}
          </div>
        </div>
        <div className="text-sm">
          <div>Pelanggan : </div>
          {bill_to && (
            <div className="w-[250px] text-sm font-semibold">{bill_to}</div>
          )}
        </div>
      </div>
      {/* end address */}

      {/* items */}
      <table className="mt-12 w-full table-fixed text-sm">
        <thead className="rounded bg-gray-200 py-12">
          <tr className="text-gray-600">
            <th className="px-4 py-4 text-start">Nama Produk</th>
            <th className="px-4 py-4 text-start">Harga</th>
            {/* <th className="text-start px-4 py-4">Qty Roll</th> */}
            <th className="px-4 py-4 text-start">Qty</th>
            <th className="px-4 py-4 text-start">Total</th>
          </tr>
        </thead>
        <tbody>
          {Items.map((item) => (
            <tr key={item.id} className="border">
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">{formatNumber(item.price)}</td>
              {/* <td className="px-4 py-3">{item.qtyRoll} / ROll </td> */}
              <td className="px-4 py-3">
                {item.qty != 0 && `${item.qty} Meter`}
                {item.qtyRoll != 0 && `${item.qtyRoll} Roll`}
              </td>
              <td className="px-4 py-3">
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
      <div className="mt-4 flex flex-row items-center justify-end text-sm">
        <div className="mr-12 space-y-2 font-semibold text-gray-500">
          <div>Sub Total</div>
          {/* <div>Discount</div> */}
          <div>Total</div>
        </div>
        <div className="space-y-2 text-end font-bold">
          <div>{formatTotal}</div>
          {/* <div>{discount ? `- ${formatNumber(discount)}` : "-"}</div> */}
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
          {invDetail.bankAccountName}
        </div>
        <div>
          <span className="font-normal">Nomor rekening : </span>
          {invDetail.bankAccountNumber}
        </div>
      </div>
      {/* end notes */}

      <div className="mt-12 w-full rounded bg-blue-500 p-12 text-sm text-white">
        <div className="flex flex-row justify-between">
          <div>
            <div className="py-2 font-bold">Tanggal Invoice</div>
            <div>{date}</div>
          </div>
          <div>
            <div className="py-2 text-end font-bold">Total Amount</div>
            <div className="text-2xl">{formatFinalTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
