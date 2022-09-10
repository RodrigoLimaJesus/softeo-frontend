import { useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import IInstallment from '../../../interfaces/installment';
import { updatePaymentStatus } from '../../../services/installments';

export default function InstallmentLine({
  installment,
  strDate,
  isPaid,
  isLate,
}: {
  installment: IInstallment;
  strDate: string;
  isPaid: boolean;
  isLate: boolean;
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
        {isLoading ? (
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
    </tr>
  );
}
