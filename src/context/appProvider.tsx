import { useEffect, useState } from 'react';
import IClient from '../interfaces/client';
import IInstallment from '../interfaces/installment';
import IReactProps from '../interfaces/reactProps';
import { getAllClients } from '../services/clients';
import { AppContext } from './appContext';

export default function AppProvider({ children }: IReactProps) {
  const [allClients, setAllClients] = useState<IClient[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    async function getInitialFetchs() {
      const clients = await getAllClients();
      setAllClients(clients);
      setIsMounted(true);
    }

    if (!isMounted) {
      getInitialFetchs();
    }
  }, [isMounted]);

  function addNewClient(client: IClient) {
    setAllClients((prev) => [...prev, client]);
  }

  function handleOpenMenu() {
    setOpenMenu((prev) => !prev);
  }

  function handleUpdatedPayment(installment: IInstallment) {
    const { clientId, id } = installment;

    const updatedClients = allClients.map((client) => {
      if (client.id === clientId) {
        return {
          ...client,
          installments: client.installments?.map((oldInstallment) => {
            if (oldInstallment.id === id) {
              return installment;
            }
            return oldInstallment;
          }),
        };
      }
      return client;
    });

    setAllClients(updatedClients);
  }

  function handleCreateInstallment(updatedClient: IClient) {
    const updatedClients = allClients.map((client) => {
      if (client.id === updatedClient.id) {
        return updatedClient;
      }
      return client;
    });

    setAllClients(updatedClients);
  }

  return (
    <AppContext.Provider
      value={{
        allClients,
        openMenu,
        handleOpenMenu,
        addNewClient,
        handleUpdatedPayment,
        handleCreateInstallment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
