"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CardSummary from "./card-summary";
import useDashboard from "@/hooks/useDasboard";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { LastInvoiceItem } from "@/@types/types";

function Dashboard() {
  const router = useRouter();
  const { summary, setSummary, lastInvoices } = useDashboard();

  const redirectToInvoices = () => {
    router.push("/document");
  };

  const rows = lastInvoices;

  const columns = [
    {
      key: "invoice_number",
      label: "Invoice Number",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "total",
      label: "Total",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  const renderCell = React.useCallback(
    (item: LastInvoiceItem, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof LastInvoiceItem];

      switch (columnKey) {
        case "invoice_number":
          return (
            <div className="max-w-32 flex flex-col">
              <div className="font-bold">{cellValue}</div>
              <div className="text-xs font-light text-gray-400">
                {item.name.substring(0, 50)} {item.name.length >= 50 && "..."}
              </div>
            </div>
          );
        case "date":
          return <div>{cellValue}</div>;
        case "total":
          return <div className="font-semibold text-blue-500">{cellValue}</div>;
        case "action":
          return (
            <div>
              <Button
                onClick={() => {
                  router.push(`/invoices?inv=${item.invoice_number}`);
                }}
                color="primary"
              >
                View
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="flex flex-col gap-2 px-3">
      <div className="text-lg font-semibold">Dashboard.</div>
      <div className="flex flex-col gap-2">
        <div className="pt-4 text-xl">Summary</div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <CardSummary
            onClick={() => redirectToInvoices()}
            data={summary["totalAllInvoice"]}
          ></CardSummary>
          <CardSummary
            onClick={() => redirectToInvoices()}
            data={summary["invoiceToday"]}
            cardType="bordered-bg"
          ></CardSummary>
          <CardSummary
            onClick={() => redirectToInvoices()}
            data={summary["invoiceYesterday"]}
          ></CardSummary>
        </div>
        <div className="mt-8 flex w-full flex-col  gap-2 md:w-full lg:w-1/2 ">
          <div className="flex flex-row items-center justify-between text-sm">
            <div className="text-xl">Last Created Invoices</div>
            <div>
              <Button onClick={() => redirectToInvoices()} color="primary">
                View All
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <Table
              color="primary"
              isStriped
              removeWrapper
              aria-label="Last created Inovices"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
