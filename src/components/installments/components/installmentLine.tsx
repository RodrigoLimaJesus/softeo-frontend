import { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';
import IInstallment from '../../../interfaces/installment';
import { updatePaymentStatus } from '../../../services/installments';

export default function InstallmentLine({
  installment,
  strDate,
  isPaid,
  isLate,
  isInHome,
}: {
  installment: IInstallment;
  strDate: string;
  isPaid: boolean;
  isLate: boolean;
  isInHome: boolean;
}) {
  const [dynamicPaid, setDynamicPaid] = useState(isPaid);
  const [isLoading, setIsLoading] = useState(false);
  const { handleUpdatedPayment } = useAppContext();

  async function handlePayment(id: number, status: boolean) {
    setIsLoading(true);
    const response = await updatePaymentStatus(id, !status);
    setIsLoading(false);
    if ('id' in response) {
      handleUpdatedPayment(response);
      setDynamicPaid(response.itsPaid);
    }
  }

  return (
    <tr className="border border-gray-400 p-1">
      <td
        className="p-2 max-w-[5rem] truncate"
        title={`R$${installment.price}`}
      >
        R${installment.price}
      </td>
      <td>{strDate}</td>
      <td>
        {dynamicPaid ? (
          <span className="p-1 bg-green-400 rounded-md">Pago</span>
        ) : isLate ? (
          <span className="p-1 bg-red-400 rounded-md">Atrasado</span>
        ) : (
          <span className="p-1 bg-orange-400 rounded-md">Pendente</span>
        )}
      </td>

      <td>
        {isInHome ? (
          <NavLink
            className="flex justify-center text-xl"
            to={`/client/${installment.clientId}`}
          >
            <MdInfoOutline />
          </NavLink>
        ) : isLoading ? (
          <div className="animate-pulse bg-black/50 w-12 h-4 rounded" />
        ) : (
          <button
            onClick={() => {
              const { id } = installment;
              if (id) {
                handlePayment(id, dynamicPaid);
              }
            }}
          >
            {dynamicPaid ? 'Estornar' : 'Pagar'}
          </button>
        )}
      </td>
      <td></td>
    </tr>
  );
}
