import axios from 'axios';
import IInstallment, {
  IBodyCreateInstallment,
} from '../interfaces/installment';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export const getAllInstallments = async (): Promise<IInstallment[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/installment/all`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updatePaymentStatus = async (
  id: number,
  status: boolean,
): Promise<IInstallment | {}> => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/installment?id=${id}&status=${status}`,
    );

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const createInstallment = async (createInfo: IBodyCreateInstallment) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/installment/create`,
      createInfo,
    );

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
