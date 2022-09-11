import { useEffect, useId, useState } from 'react';
import IInstallment from '../../../interfaces/installment';

export default function Invoicing({
  installments = [],
}: {
  installments: IInstallment[] | undefined;
}) {
  const [paidOut, setPaidOut] = useState(0);
  const [pending, setPending] = useState(0);
  const [late, setLate] = useState(0);
  const ammounts = [
    { id: useId(), price: late, label: 'Em atraso', bgColor: 'bg-red-400' },
    { id: useId(), price: paidOut, label: 'Recebido', bgColor: 'bg-green-400' },
    {
      id: useId(),
      price: pending,
      label: 'Pendente',
      bgColor: 'bg-orange-400',
    },
  ];

  useEffect(() => {
    const sum = installments.reduce(
      (acc, installment) => {
        const date = new Date(installment.paymentDate);
        const now = new Date();
        date.setDate(date.getDate() + 1);

        const isLate = date < now;
        const isPaid = installment.itsPaid;

        if (isPaid) {
          acc.isPaid += installment.price;
        }

        if (isLate && !isPaid) {
          acc.isLate += installment.price;
        }

        if (!isLate && !isPaid) {
          acc.isPending += installment.price;
        }
        return acc;
      },
      { isLate: 0, isPaid: 0, isPending: 0 },
    );

    setPaidOut(sum.isPaid);
    setPending(sum.isPending);
    setLate(sum.isLate);
  }, [installments]);

  return (
    <div className="flex justify-around my-3">
      {ammounts.map(({ bgColor, label, price }) => (
        <div
          className={`
        flex flex-col items-center
        border border-black
        font-bold ${bgColor}
        px-2 py-1 rounded-lg
        `}
        >
          <span>{label}</span>
          <span className="max-w-[5rem] truncate" title={`${price}`}>
            R$ {price}
          </span>
        </div>
      ))}
    </div>
  );
}
