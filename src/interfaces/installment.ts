import IClient from './client';

export default interface IInstallment {
  id?: number;
  clientId: number;
  client?: IClient;
  price: number;
  paymentDate: Date;
  itsPaid: boolean;
}
