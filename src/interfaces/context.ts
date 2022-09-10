import IClient from './client';

export default interface IContext {
  allClients: IClient[];
  openMenu: boolean;
  handleOpenMenu: () => void;
  addNewClient: (client: IClient) => void;
}
