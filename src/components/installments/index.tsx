import IInstallment from '../../interfaces/installment';
import InstallmentLine from './components/installmentLine';

export default function Installments({
  installments = [],
}: {
  installments: IInstallment[] | undefined;
}) {
  return installments.length === 0 ? (
    <div className="text-center my-7">
      <span>Nenhuma parcela registrada ainda.</span>
    </div>
  ) : (
    <table className="table-auto w-full my-4">
      <thead>
        <tr className="text-left border border-gray-400 p-1">
          <th className="p-2">Valor</th>
          <th>Vencimento</th>
          <th>Status</th>
          <th>Pagar</th>
        </tr>
      </thead>

      <tbody>
        {installments.map((installment) => {
          const date = new Date(installment.paymentDate);
          const now = new Date();

          const isLate = date < now;
          const isPaid = installment.itsPaid;

          const adjustDay = date.setDate(date.getDate() + 1);
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
  );
}
