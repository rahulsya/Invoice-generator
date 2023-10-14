export interface saveInvoiceDTO{
    invoice_number:string
    bill_from?: string
    bill_to: string
    date: string
    due_date: string
    notes: string
    discount: number
}