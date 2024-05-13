export enum IOrderStatus {
  PAYMENT = 'PAYMENT',
  PICKED_UP = 'PICKED_UP',
  ON_PROGRESS = 'ON_PROGRESS',
  ON_DELIVER = 'ON_DELIVER',
  DONE = 'DONE',
  CANCEL = 'CANCEL',
}

export interface IOrder {
  userCredentialId: string;
}

export interface IOrderDetail {
  orderId: string;
  packageOnServiceId: string;
  quantity?: number;
}

export interface IUpdateOrder {
  redirectUrl?: string;
  amount?: number;
  orderStatus?: IOrderStatus;
}

export interface IUpdateOrderDetail {
  quantity?: number;
}
