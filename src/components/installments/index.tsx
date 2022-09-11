import { useEffect, useState } from 'react';
import IInstallment from '../../interfaces/installment';
import InstallmentLine from './components/installmentLine';
import Invoicing from './components/invoicing';

export default function Installments({
  installments = [],
}: {
  installments: IInstallment[] | undefined;
}) {
  const [filtredInstallments, setFiltredInstallments] = useState(installments);
  const [checkLate, setCheckLate] = useState(false);
  const [checkPaid, setCheckPaid] = useState(false);
  const [checkPending, setCheckPending] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    let filtredList = installments;

    if (checkLate) {
      filtredList = filtredList.filter((installment) => {
        const date = new Date(installment.paymentDate);
        const now = new Date();
        date.setDate(date.getDate() + 1);

        return date < now && !installment.itsPaid;
      });
    }

    if (checkPending) {
      filtredList = filtredList.filter((installment) => !installment.itsPaid);
    }

    if (checkPaid) {
      filtredList = filtredList.filter((installment) => installment.itsPaid);
    }

    if (startDate) {
      filtredList = filtredList.filter(
        (installment) =>
          new Date(installment.paymentDate) >= new Date(startDate),
      );
    }

    if (endDate) {
      filtredList = filtredList.filter(
        (installment) => new Date(installment.paymentDate) <= new Date(endDate),
      );
    }

    setFiltredInstallments(filtredList);
  }, [installments, checkLate, checkPaid, checkPending, endDate, startDate]);

  return installments.length === 0 ? (
    <div className="text-center my-7">
      <span>Nenhuma parcela registrada ainda.</span>
    </div>
  ) : (
    <div>
      <div className="border border-gray-400 p-3 mt-4 rounded-lg">
        <h2 className="text-center font-bold">FILTRAR POR</h2>
        <div>
          <span className="font-bold">Status</span>
          <div>
            <label className="mr-5">
              <input
                type="checkbox"
                checked={checkLate}
                onChange={() => setCheckLate((prev) => !prev)}
                className="mx-1"
              />
              Atrasadas
            </label>

            <label className="mr-5">
              <input
                type="checkbox"
                checked={checkPending}
                onChange={() => setCheckPending((prev) => !prev)}
                className="mx-1"
              />
              Pendetes
            </label>

            <label className="mr-5">
              <input
                type="checkbox"
                checked={checkPaid}
                onChange={() => setCheckPaid((prev) => !prev)}
                className="mx-1"
              />
              Pagas
            </label>
          </div>
        </div>

        <div>
          <span className="font-bold">Data</span>
          <div className="flex">
            <label className="flex flex-col mr-4">
              Inicial
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="
                border border-black
                rounded
                p-1
                w-fit
                disabled:text-gray-400
                "
                max="9999-12-31"
              />
            </label>

            <label className="flex flex-col">
              Final
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="
                border border-black
                rounded
                p-1
                w-fit
                disabled:text-gray-400
                "
                max="9999-12-31"
              />
            </label>
          </div>
        </div>
      </div>

      <Invoicing installments={installments} />

      <div className="max-h-[70vh] overflow-auto my-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left border border-gray-400 p-1">
              <th className="p-2">Valor</th>
              <th>Vencimento</th>
              <th>Status</th>
              <th>Pagar</th>
            </tr>
          </thead>

          <tbody>
            {filtredInstallments.map((installment) => {
              const date = new Date(installment.paymentDate);
              const now = new Date();
              const adjustDay = date.setDate(date.getDate() + 1);

              const isLate = date < now;
              const isPaid = installment.itsPaid;

              const strDate = new Date(adjustDay).toLocaleDateString();

              return (
                <InstallmentLine
                  key={installment.id}
                  installment={installment}
                  isLate={isLate}
                  isPaid={isPaid}
                  strDate={strDate}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
