export interface CreateInvoiceDto {
  invoice_number: string;
  bill_from: string;
  bill_to: string;
  date: string;
  due_date: string;
  notes: string;
  discount: number;
  items: ItemInvoice[];
}

export interface Invoice {
  invoice_number: string;
  bill_from: string;
  bill_to: string;
  date: string;
  due_date: string;
  notes: string;
  discount: number;
  items: ItemInvoice[];
}

export interface ItemInvoice {
  id: number;
  name: string;
  price: number;
  qty: number;
  qtyRoll: number;
}
