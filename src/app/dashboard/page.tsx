"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardSummary from "./card-summary";
import { getTotalData, getTotalDataSummaryByDate } from "@/firebase/store";
import { FormatDate } from "@/utils/date";

function Dashboard() {
  const router = useRouter();
  const [Summary, setSummary] = useState<{
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

  useEffect(() => {
    TotalAlldata();
    getTotalDataToday();
    getTotalDataYesterday();
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

  const redirectToInvoices = () => {
    router.push("/document");
  };

  return (
    <div className="flex flex-col gap-2 px-3">
      <div className="text-lg font-semibold">Dashboard.</div>
      <div className="flex flex-col gap-2">
        <div className="pt-4 text-lg text-sm">Summary</div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <CardSummary
            onClick={() => redirectToInvoices()}
            data={Summary["totalAllInvoice"]}
          ></CardSummary>
          <CardSummary
            onClick={() => redirectToInvoices()}
            data={Summary["invoiceToday"]}
            cardType="bordered-bg"
          ></CardSummary>
          <CardSummary
            onClick={() => redirectToInvoices()}
            data={Summary["invoiceYesterday"]}
          ></CardSummary>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
