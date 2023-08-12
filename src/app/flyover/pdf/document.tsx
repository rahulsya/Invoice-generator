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
import { invDetail } from "@/utils/detailInvoice";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    // paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  invHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invLogo: {
    width: 120,
    height: 120,
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
    left: 15,
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
    width: "20%",
  },
  qty: {
    width: "30%",
  },
  rate: {
    width: "20%",
  },
  // meter: {
  //   width: "15%",
  // },
  amount: {
    textAlign: "left",
    width: "30%",
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
    width: "20%",
    paddingRight: 10,
    lineHeight: 2,
  },
  rowQty: {
    width: "30%",
    textAlign: "center",
  },
  rowRate: {
    width: "20%",
    textAlign: "center",
  },
  // rowMeter: {
  //   width: "15%",
  //   textAlign: "center",
  // },
  rowAmount: {
    width: "30%",
    textAlign: "left",
  },
  summaryPrice: {
    flexDirection: "row",
    top: 65,
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
    top: 100,
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
  logoUrl,
}: {
  data: string;
  detail: string;
  summaryTotal: string;
  logoUrl: string;
}) {
  const Items: Item[] = JSON.parse(data);
  const Detail: Details = JSON.parse(detail);
  const Total: { total: number; finalTotal: number } = JSON.parse(summaryTotal);

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.invHeader}>
          <View>
            <Text style={styles.textInv}>INVOICE</Text>
            <Text style={styles.textInvNo}>#{Detail?.invoice_number}</Text>
          </View>
          <View>
            <Image style={styles.invLogo} src={logoUrl} />
          </View>
        </View>
        <View style={styles.addressWrapper}>
          <View style={styles.addressFrom}>
            <Text style={styles.titleAddress}>{invDetail.storeName}</Text>
            <Text style={styles.addressDesc}>{invDetail.storeAddress}</Text>
            <Text style={styles.addressDesc}>
              {invDetail.phoneNumber} - {invDetail.phoneNumber2}
            </Text>
          </View>
          <View style={styles.addressTo}>
            <Text>Pelanggan : </Text>
            <Text style={styles.titleAddress}>{Detail?.bill_to}</Text>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.description}>Nama Produk</Text>
          <Text style={styles.qty}>Harga</Text>
          <Text style={styles.rate}>Qty</Text>
          <Text style={styles.amount}>Total</Text>
        </View>
        {Items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.rowDescription}>{item.name}</Text>
            <Text style={styles.rowQty}>{formatNumber(item.price)}</Text>
            <Text style={styles.rowRate}>
              {item.qty != 0 && `${item.qty} Meter`}
              {item.qtyRoll != 0 && `${item.qtyRoll} Roll`}
            </Text>
            <Text style={styles.rowAmount}>
              {formatNumber(
                item.price * (item.qty != 0 ? item.qty : item.qtyRoll)
              )}
            </Text>
          </View>
        ))}
        <View style={styles.summaryPrice}>
          <View style={styles.summaryTitle}>
            <Text>Sub total</Text>
            <Text>Total</Text>
          </View>
          <View style={styles.summaryValue}>
            <Text>{formatNumber(Total.total)}</Text>
            <Text>{formatNumber(Total.total)}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 10, top: 70 }}>*Infromasi Pembayaran </Text>
        <Text style={{ fontSize: 10, maxWidth: 250, top: 75 }}>
          Bank : {invDetail.bankAccountName}
        </Text>
        <Text style={{ fontSize: 10, maxWidth: 250, top: 75 }}>
          Nomor rekening : {invDetail.bankAccountNumber}
        </Text>
        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceDetailsDate}>
            <Text>Tanggal Invoice</Text>
            <Text>{Detail.date}</Text>
          </View>
          <View style={styles.invoiceDetailsTotal}>
            <Text>Total</Text>
            <Text>{formatNumber(Total.total)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PdfDocument;
