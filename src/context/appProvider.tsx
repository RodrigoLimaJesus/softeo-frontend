import { useEffect, useState } from 'react';
import IClient from '../interfaces/client';
import IReactProps from '../interfaces/reactProps';
import { getAllClients } from '../services/clients';
import { AppContext } from './appContext';

export default function AppProvider({ children }: IReactProps) {
  const [allClients, setAllClients] = useState<IClient[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function getInitialFetchs() {
      const clients = await getAllClients();
      setAllClients(clients);
      setIsMounted(true);
    }

    if (!isMounted) {
      getInitialFetchs();
    }
  });

  return (
    <AppContext.Provider value={{ allClients }}>{children}</AppContext.Provider>
  );
}
