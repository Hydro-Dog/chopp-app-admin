export type ClientAppConfig = {
  averageDeliveryCost?: number | null;
  freeDeliveryIncluded?: boolean;
  freeDeliveryThreshold?: number | null;
  openTime?: string;
  closeTime?: string;
  disabled?: boolean;
  deliveryAndPaymentsVerbose?: string;
  publicOfferVerbose?: string;
  description?: string;
  phoneNumber?: string;
};
