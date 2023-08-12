export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const generateInvoice = (): string => {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const second = newDate.getSeconds();
  const milisecond = newDate.getMilliseconds();

  return `INV-${year}${month}${date}${second}-${milisecond}`;
};
