export type Item = {
  id: number;
  name: string;
  price: number;
  qty: number;
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
