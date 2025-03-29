export type GeneralAnalyticsData = {
  data: {
    items: {
      date: string;
      ordersQuantity: number;
      amount: {
        value: string;
        currency: string;
      };
    }[];
    summary: {
      totalAmount: {
        value: string;
        currency: string;
      };
      minOrderAmount: string;
      maxOrderAmount: string;
      averageOrderAmount: string;
    };
  };
};

export type ProductAnalyticsData = [
  {
    orderDate: string;
    product: {
      price: {
        value: string;
        currency: string;
      };
      title: string;
      quantity: number;
    };
  },
];
