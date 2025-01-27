export type Item = {
  id: number;
  name: string;
  price: number;
  qty: number;
  qtyRoll: number;
  unitType: "Meter" | "Rool" | string;
  // total: number;
};
export type Details = {
  invoice_number: string;
  bill_from: string;
  bill_to: string;
  date: string;
  due_date: string;
  notes: string;
  discount: number;
};

// for flyover purpose
export type StickerItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  qtyRoll: number;
};

export interface Settings {
  application_name: string;
  logo_url: string;
  address: string;
  bank_name: string;
  bank_account_number: string;
  logo: File | null;
  file_name: string;
  phone_number: string;
}

// dashboard
export interface LastInvoiceItem {
  key: number;
  invoice_number: string;
  name: string;
  date: string;
  total: string;
}

export interface newItem {
  name: string;
  price: number;
  qty: number;
  unitType: string;
}
