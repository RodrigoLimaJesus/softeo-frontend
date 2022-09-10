import { useEffect, useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';

export default function ClientList() {
  const { allClients } = useAppContext();
  const [filtredList, setFiltredList] = useState(allClients);
  const [nameFilter, setNameFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const filtredByName = allClients.filter(({ name }) =>
      name.toLowerCase().includes(nameFilter.toLowerCase()),
    );
    setFiltredList(filtredByName);
  }, [nameFilter, allClients]);

  return (
    <table className="table-auto w-full my-4">
      <thead>
        <tr className="text-left">
          <th className="pr-5">#</th>
          <th>Nome</th>
          <th className="hidden">Pendências</th>
          <th className="text-center">Detalhes</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td></td>
          <td>
            <input
              placeholder="Nome..."
              className="p-1 my-2 border border-black rounded-md"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </td>
        </tr>
        {filtredList.map((client, index) => (
          <tr key={client.id}>
            <td className="pr-5 max-w-[4rem] truncate">{index + 1}</td>
            <td className="max-w-[9rem] truncate">{client.name}</td>
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
