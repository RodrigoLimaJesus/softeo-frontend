import IClient from './client';
import IInstallment from './installment';

export default interface IContext {
  allClients: IClient[];
  openMenu: boolean;
  handleOpenMenu: () => void;
  addNewClient: (client: IClient) => void;
  handleUpdatedPayment: (installment: IInstallment) => void;
}
