export interface IOrder {
  userCredentialId: string;
  amount?: number;
  order_status?: string;
}

export interface IOrderDetail {
  orderId: string;
  packageOnServiceId: string;
  quantity?: number;
}

export interface IUpdateOrder {
  redirectUrl?: string;
  amount?: number;
  order_status?: string;
}

export interface IUpdateOrderDetail {
  quantity?: number;
}
