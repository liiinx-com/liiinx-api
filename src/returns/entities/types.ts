export enum ReturnRequestItemStatus {
  NOT_SET = "NOT_SET",
  PROCESSING = "PROCESSING",
  APPROVED = "APPROVED",
  DELETED = "DELETED",
  CANCELLED_BY_USER = "CANCELLED_BY_USER",
  CANCELLED_BY_MANAGER = "CANCELLED_BY_MANAGER",
  CANCELLED_BY_DRIVER = "CANCELLED_BY_DRIVER",
  RECEIVED_AT_LIIINX = "RECEIVED_AT_LIIINX",
  DELIVERED = "DELIVERED",
}

export enum ReturnRequestStatus {
  INHERIT_FROM_ITEM = "NOT_SET",
  PROCESSING = "PROCESSING",
  APPROVED = "APPROVED",
  DELETED = "DELETED",
  CANCELLED_BY_USER = "CANCELLED_BY_USER",
  CANCELLED_BY_MANAGER = "CANCELLED_BY_MANAGER",
  CANCELLED_BY_DRIVER = "CANCELLED_BY_DRIVER",
  RECEIVED_AT_LIIINX = "RECEIVED_AT_LIIINX",
  DELIVERED = "DELIVERED",

  PARTIALLY_COMPLETED = "PARTIALLY_COMPLETED", // TODO: Candidate to remove
}

export enum ReturnRequestItemProductType {
  NOT_SET = "NOT_SET",
  ReturnPackage = "returnPackage",
  ShippingBox = "shippingBox",
}

//TODO: define sizes
export enum ReturnRequestItemSize {
  NOT_SET = "NOT_SET",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

//TODO: define slots
export enum PickupTimeSlot {
  NOT_SET = "NOT_SET",
  SLOT_A = "SLOT_A",
  SLOT_B = "SLOT_B",
}

export enum Retailer {
  NOT_SET = "NOT_SET",
  AMAZON = "AMAZON",
  WALMART = "WALMART",
}
