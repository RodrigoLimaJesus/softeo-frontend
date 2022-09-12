import IClient from './client';
import IInstallment from './installment';

export default interface IContext {
  allClients: IClient[];
  allInstallments: IInstallment[];
  openMenu: boolean;
  handleOpenMenu: () => void;
  addNewClient: (client: IClient) => void;
  handleUpdatedPayment: (installment: IInstallment) => void;
  handleCreateInstallment: (
    client: IClient,
    installments: IInstallment[],
  ) => void;
}
