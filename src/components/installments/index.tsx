import { useEffect, useId, useState } from 'react';
import IInstallment from '../../interfaces/installment';
import FormCreateInstallments from './components/formCreateInstallments';
import InstallmentLine from './components/installmentLine';
import Invoicing from './components/invoicing';

export default function Installments({
  installments = [],
  isInHome = false,
}: {
  installments?: IInstallment[];
  isInHome?: boolean;
}) {
  const [filtredInstallments, setFiltredInstallments] = useState(installments);
  const [checkLate, setCheckLate] = useState(false);
  const [checkPaid, setCheckPaid] = useState(false);
  const [checkPending, setCheckPending] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const statusFilters = [
    {
      id: useId(),
      state: checkLate,
      setState: setCheckLate,
      label: 'Atrasadas',
    },
    {
      id: useId(),
      state: checkPending,
      setState: setCheckPending,
      label: 'Pendentes',
    },
    { id: useId(), state: checkPaid, setState: setCheckPaid, label: 'Pagas' },
  ];

  const dateFilters = [
    { id: useId(), state: startDate, setState: setStartDate, label: 'Inicial' },
    { id: useId(), state: endDate, setState: setEndDate, label: 'Final' },
  ];

  useEffect(() => {
    if (installments.length > 0) {
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
          (installment) =>
            new Date(installment.paymentDate) <= new Date(endDate),
        );
      }

      setFiltredInstallments(filtredList);
    }
  }, [installments, checkLate, checkPaid, checkPending, endDate, startDate]);

  return (
    <div className="bg-containerWhite rounded-lg p-3 my-4 md:p-5 md:px-16 lg:px-24">
      <div className="my-6 sm:mx-10 md:mx-14 lg:mx-24">
        <div className="font-bold flex items-center justify-between">
          <h2 className="md:text-xl">MINHAS PARCELAS</h2>
          {!isInHome && (
            <button
              className="
              transition
              bg-containerBlue hover:bg-containerBlue/75
              text-white
              p-1 px-2
              rounded-sm
              text-sm md:text-base
              "
              onClick={() => setShowCreateForm((prev) => !prev)}
            >
              Nova
            </button>
          )}
        </div>

        {!isInHome && (
          <FormCreateInstallments showCreateForm={showCreateForm} />
        )}
      </div>
      {installments.length === 0 ? (
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
                {statusFilters.map(({ id, label, state, setState }) => (
                  <label key={id} className="mr-5">
                    <input
                      type="checkbox"
                      checked={state}
                      onChange={() => setState((prev) => !prev)}
                      className="mx-1"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold">Data</span>
              <div className="flex">
                {dateFilters.map(({ id, label, state, setState }) => (
                  <label key={id} className="flex flex-col mr-4">
                    {label}
                    <input
                      type="date"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="border border-black rounded p-1 w-fit disabled:text-gray-400"
                      max="9999-12-31"
                    />
                  </label>
                ))}
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
                  {isInHome ? (
                    <th className="text-center">Usuário</th>
                  ) : (
                    <th>Pagar</th>
                  )}
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
                      isInHome={isInHome}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
