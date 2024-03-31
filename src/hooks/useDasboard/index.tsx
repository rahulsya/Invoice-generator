import { LastInvoiceItem } from "@/@types/types";
import {
  getLastData,
  getTotalData,
  getTotalDataSummaryByDate,
} from "@/firebase/store";
import { formatNumber } from "@/utils";
import { FormatDate } from "@/utils/date";
import React, { useEffect, useState } from "react";

export default function useDashboard() {
  const [summary, setSummary] = useState<{
    [field: string]: {
      title: string;
      desc: string;
      content: string;
    };
  }>({
    totalAllInvoice: {
      title: "Total Invoices",
      desc: "Total All created invoices",
      content: "",
    },
    invoiceToday: {
      title: "Invoice today",
      desc: "",
      content: "",
    },
    invoiceYesterday: {
      title: "Invoice Yesterday",
      desc: "",
      content: "",
    },
  });
  const [lastInvoices, setLastInvoices] = useState<LastInvoiceItem[]>([]);

  useEffect(() => {
    TotalAlldata();
    getTotalDataToday();
    getTotalDataYesterday();
    getLastDataInvoices();
  }, []);

  const TotalAlldata = async () => {
    const data = await getTotalData();
    setSummary((oldState) => ({
      ...oldState,
      totalAllInvoice: {
        title: "Total Invoices",
        desc: `Total All created invoices`,
        content: data ? `${data.total}` : "0",
      },
    }));
  };

  const getTotalDataToday = async () => {
    const date = new Date();
    const data = await getTotalDataSummaryByDate(date);
    setSummary((oldState) => ({
      ...oldState,
      invoiceToday: {
        title: "Invoice today",
        desc: `${FormatDate(date)}`,
        content: data ? `${data.data.length}` : "0",
      },
    }));
  };

  const getTotalDataYesterday = async () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const data = await getTotalDataSummaryByDate(yesterday);

    setSummary((oldState) => ({
      ...oldState,
      invoiceYesterday: {
        title: "Invoice Yesterday",
        desc: `${FormatDate(yesterday)}`,
        content: data ? `${data.data.length}` : "0",
      },
    }));
  };

  const getLastDataInvoices = async () => {
    const data = await getLastData();
    if (data) {
      const formatData = data.data.map((item, index) => {
        const inv_date = new Date(item.date);
        const totalInv = item.items.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.qty) * Number(currentValue.price),
          0
        );
        return {
          key: index,
          invoice_number: item.invoice_number,
          name: item.bill_to,
          date: FormatDate(inv_date),
          total: formatNumber(totalInv),
        };
      });
      setLastInvoices(formatData);
    }
  };

  return {
    summary,
    setSummary,
    lastInvoices,
  };
}
