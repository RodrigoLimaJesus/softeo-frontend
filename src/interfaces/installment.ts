import IClient from './client';

export default interface IInstallment {
  id: number;
  clientId: number;
  client?: IClient;
  price: number;
  paymentDate: Date;
  itsPaid: boolean;
}

export interface IBodyCreateInstallment {
  clientId: number;
  startDate: string;
  price: number;
  quantity: number;
  intervalDay: number;
}
