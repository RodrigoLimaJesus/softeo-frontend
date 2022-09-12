import { useEffect, useState } from 'react';
import IClient from '../interfaces/client';
import IInstallment from '../interfaces/installment';
import IReactProps from '../interfaces/reactProps';
import { getAllClients } from '../services/clients';
import { getAllInstallments } from '../services/installments';
import { AppContext } from './appContext';

export default function AppProvider({ children }: IReactProps) {
  const [allClients, setAllClients] = useState<IClient[]>([]);
  const [allInstallments, setAllInstallments] = useState<IInstallment[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    async function getInitialFetchs() {
      const [clients, installments] = await Promise.all([
        getAllClients(),
        getAllInstallments(),
      ]);
      setAllClients(clients);
      setAllInstallments(installments);
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

  function handleUpdatedPayment(
    installment: IInstallment,
    updatedInstallments: IInstallment[],
  ) {
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
    setAllInstallments(updatedInstallments);
  }

  function handleCreateInstallment(
    updatedClient: IClient,
    newInstallments: IInstallment[],
  ) {
    const updatedClients = allClients.map((client) => {
      if (client.id === updatedClient.id) {
        return updatedClient;
      }
      return client;
    });

    setAllClients(updatedClients);
    setAllInstallments(newInstallments);
  }

  return (
    <AppContext.Provider
      value={{
        allClients,
        allInstallments,
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
