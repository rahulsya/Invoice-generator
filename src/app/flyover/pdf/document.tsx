"use client";
import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@joshuajaco/react-pdf-renderer-bundled";
import useItem from "@/hooks/useItem";
import useDetail from "@/hooks/useDetail";
import { formatNumber } from "@/utils";
import { Details, Item } from "@/@types/types";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  invHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invLogo: {
    width: 150,
    height: 150,
  },
  textInv: {
    fontSize: 14,
    fontStyle: "bold",
  },
  textInvNo: {
    top: 5,
    fontSize: 18,
    color: "#3b82f6",
  },
  addressWrapper: {
    flexDirection: "row",
    fontSize: 12,
    top: 20,
  },
  titleAddress: {
    fontSize: 14,
    top: 4,
  },
  addressTo: {
    left: 10,
    maxWidth: 240,
  },
  addressFrom: {
    maxWidth: 250,
  },
  addressDesc: {
    top: 10,
    lineHeight: 2,
    fontSize: 10,
  },
  tableHeader: {
    top: 40,
    flexDirection: "row",
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#e5e7eb",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    // flexGrow: 1,
    fontSize: 12,
  },
  description: {
    width: "40%",
  },
  qty: {
    width: "10%",
  },
  rate: {
    width: "15%",
  },
  amount: {
    maxWidth: "100%",
  },
  tableRow: {
    top: 45,
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 24,
    fontSize: 12,
  },
  rowDescription: {
    width: "40%",
    paddingRight: 10,
    lineHeight: 2,
  },
  rowQty: {
    width: "10%",
  },
  rowRate: {
    width: "15%",
    textAlign: "center",
  },
  rowAmount: {
    maxWidth: "100%",
  },
  summaryPrice: {
    flexDirection: "row",
    top: 55,
    justifyContent: "flex-end",
  },
  summaryTitle: {
    fontSize: 14,
    right: 40,
    lineHeight: 1.5,
  },
  summaryValue: {
    fontSize: 14,
    lineHeight: 1.5,
  },
  invoiceDetails: {
    top: 75,
    fontSize: 12,
    padding: 20,
    backgroundColor: "#3b82f6",
    borderRadius: 5,
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invoiceDetailsDate: {
    lineHeight: 1.5,
    fontSize: 14,
  },
  invoiceDetailsTotal: {
    alignItems: "flex-end",
    lineHeight: 1.5,
    fontSize: 14,
  },
});

function PdfDocument({
  data,
  detail,
  summaryTotal,
}: {
  data: string;
  detail: string;
  summaryTotal: string;
}) {
  const Items: Item[] = JSON.parse(data);
  const Detail: Details = JSON.parse(detail);
  const Total: { total: number; finalTotal: number } = JSON.parse(summaryTotal);

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.invHeader}>
          <View>
            <Text style={styles.textInvNo}>#{Detail?.invoice_number}</Text>
            <Text style={styles.textInv}>INVOICE</Text>
          </View>
          <View>
            <Text>logo here</Text>
            <Image style={styles.invLogo} src={"/logoFlyover.png"} />
          </View>
        </View>
        <View style={styles.addressWrapper}>
          <View style={styles.addressFrom}>
            <Text>From : </Text>
            {Detail.bill_from && (
              <>
                <Text style={styles.titleAddress}>
                  {Detail?.bill_from.split(",")[0]}
                </Text>
                <Text style={styles.addressDesc}>{Detail?.bill_from}</Text>
              </>
            )}
          </View>
          <View style={styles.addressTo}>
            <Text>To : </Text>
            {Detail.bill_to && (
              <>
                <Text style={styles.titleAddress}>
                  {Detail?.bill_to.split(",")[0]}
                </Text>
                <Text style={styles.addressDesc}>{Detail?.bill_to}</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.description}>Item Name</Text>
          <Text style={styles.qty}>Price</Text>
          <Text style={styles.rate}>Qty</Text>
          <Text style={styles.amount}>Total</Text>
        </View>
        {Items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.rowDescription}>{item.name}</Text>
            <Text style={styles.rowQty}>{formatNumber(item.price)}</Text>
            <Text style={styles.rowRate}>{item.qty}</Text>
            <Text style={styles.rowAmount}>
              {formatNumber(item.price * item.qty)}
            </Text>
          </View>
        ))}
        <View style={styles.summaryPrice}>
          <View style={styles.summaryTitle}>
            <Text>Sub total</Text>
            <Text>Discount</Text>
            <Text>Total</Text>
          </View>
          <View style={styles.summaryValue}>
            <Text>{formatNumber(Total.total)}</Text>
            <Text>
              {Detail?.discount ? `- ${formatNumber(Detail?.discount)}` : "-"}
            </Text>
            <Text>{formatNumber(Total.finalTotal)}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 10, top: 55 }}>Notes </Text>
        <Text style={{ fontSize: 10, maxWidth: 250, top: 60 }}>
          {Detail.notes}
        </Text>
        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceDetailsDate}>
            <Text>Invoice Date</Text>
            <Text>Date issued : {Detail.date}</Text>
            <Text>Due Date : {Detail.due_date}</Text>
          </View>
          <View style={styles.invoiceDetailsTotal}>
            <Text>Total</Text>
            <Text>{formatNumber(Total.finalTotal)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PdfDocument;
