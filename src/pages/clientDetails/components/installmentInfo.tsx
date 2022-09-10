import IClient from '../../../interfaces/client';

export default function InstallmentInfo({
  clientDetail,
}: {
  clientDetail: IClient;
}) {
  return clientDetail.installments?.length === 0 ? (
    <div>
      <span>Nenhuma parcela registrada ainda.</span>
      <button>Adicionar</button>
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
        {clientDetail.installments?.map((installment) => {
          const date = new Date(installment.paymentDate);
          const now = new Date();

          const isLate = date < now;
          const isPaid = installment.itsPaid;

          const adjustDay = date.setDate(date.getDate() + 1);
          const strDate = new Date(adjustDay).toLocaleDateString();

          return (
            <tr key={installment.id} className="border border-gray-400 p-1">
              <td
                className="p-2 max-w-[5rem] truncate"
                title={`R$${installment.price}`}
              >
                R${installment.price}
              </td>
              <td>{strDate}</td>
              <td>
                {isPaid ? (
                  <span className="p-1 bg-green-400 rounded-md">Pago</span>
                ) : isLate ? (
                  <span className="p-1 bg-red-400 rounded-md">Atrasado</span>
                ) : (
                  <span className="p-1 bg-orange-400 rounded-md">Pendente</span>
                )}
              </td>
              <td>
                <button>Pagar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
