import { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';
import Filters from './filters';

export default function ClientList() {
  const { allClients } = useAppContext();
  const [filtredList, setFiltredList] = useState(allClients);

  const navigate = useNavigate();

  return (
    <table className="table-auto w-full my-4">
      <thead>
        <tr className="text-left">
          <th className="p-2">#</th>
          <th>Nome</th>
          <th className="hidden md:table-cell">Email</th>
          <th className="hidden lg:table-cell">Telefone</th>
          <th className="hidden text-center sm:table-cell">Pendências</th>
          <th className="text-center">Detalhes</th>
        </tr>
      </thead>

      <tbody>
        <Filters setFiltredList={setFiltredList} />

        {filtredList.map((client, index) => (
          <tr key={client.id} className="border-2">
            <td className="p-2 max-w-[4rem] truncate">{index + 1}</td>
            <td className="max-w-[1px] truncate">{client.name}</td>
            <td className="hidden max-w-[9rem] truncate md:table-cell">
              {client.email}
            </td>
            <td className="hidden lg:table-cell">{client.cellNumber}</td>
            <td className="hidden text-white text-center sm:table-cell">
              {client.installments?.some(({ itsPaid }) => itsPaid === false) ? (
                <span className="bg-orange-500 p-1 rounded-lg">Sim</span>
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