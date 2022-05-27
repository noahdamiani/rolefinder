export const toDollarValue = (num: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    num
  );
