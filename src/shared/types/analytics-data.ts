type Money = {
  value: string;
  currency: string;
};

export type AnalyticsDataItem = {
  date: string;
  ordersQuantity: number;
  amount: Money;
};

type Summary = {
  totalAmount: Money;
  minOrderAmount: string;
  maxOrderAmount: string;
  averageOrderAmount: string;
};

export type GeneralAnalyticsData = {
  items: AnalyticsDataItem[];
  summary: Summary;
};

type Product = {
  product: {
    price: Money;
    title: string;
    quantity: number;
  };
};

export type AnalyticsDataProduct = {
  orderDate: string;
  product: Product;
}[];
