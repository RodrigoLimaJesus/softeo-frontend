import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';

export default function ClientList() {
  const { allClients } = useAppContext();
  const navigate = useNavigate();

  return (
    <table className="table-auto w-full my-4">
      <thead>
        <tr className="text-left">
          <th>#</th>
          <th>Nome</th>
          <th className="hidden">Pendências</th>
          <th className="text-center">Detalhes</th>
        </tr>
      </thead>

      <tbody>
        {allClients.map((client, index) => (
          <tr key={client.id}>
            <td className="pr-5 max-w-[4rem] truncate">{index + 1}</td>
            <td className="pr-3 max-w-[9rem] truncate">{client.name}</td>
            <td className="hidden text-white">
              {client.installments?.some(({ itsPaid }) => itsPaid === false) ? (
                <span className="bg-red-500 p-1 rounded-lg">Sim</span>
              ) : (
                <span className="bg-green-500 p-1 rounded-lg">Não</span>
              )}
            </td>
            <td className="text-center text-lg">
              <button onClick={() => navigate(`/client/${client.id}`)}>
                <MdInfoOutline />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
