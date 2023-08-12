export type Item = {
  id: number;
  name: string;
  price: number;
  qty: number;
  qtyRoll: number;
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
