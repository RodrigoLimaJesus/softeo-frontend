import IClient from '../interfaces/client';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export const getAllClients = async (): Promise<IClient[]> => {
  try {
    const response = await fetch(`${BASE_URL}/client/all`);
    const clients = await response.json();
    return clients;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getClientById = async (
  id: string | undefined,
): Promise<IClient | {}> => {
  if (id) {
    try {
      const response = await fetch(`${BASE_URL}/client/${id}`);
      const client = await response.json();
      return client;
    } catch (error) {
      console.log(error);
      return {};
    }
  } else {
    return {};
  }
};
