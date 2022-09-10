import axios from 'axios';
import IClient from '../interfaces/client';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export const getAllClients = async (): Promise<IClient[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/client/all`);
    return data;
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
      const { data } = await axios.get(`${BASE_URL}/client/${id}`);

      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  } else {
    return {};
  }
};

export const createClient = async (
  name: string,
  email: string,
  phone: string,
  cpf: string,
): Promise<IClient | {}> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/client/create`, {
      cpf,
      name,
      email,
      cellNumber: phone,
    });

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
