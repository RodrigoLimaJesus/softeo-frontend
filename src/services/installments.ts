import axios from 'axios';
import IInstallment from '../interfaces/installment';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

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
