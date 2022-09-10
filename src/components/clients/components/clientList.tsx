import { useEffect, useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';

export default function ClientList() {
  const { allClients } = useAppContext();
  const [filtredList, setFiltredList] = useState(allClients);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [checkYes, setCheckYes] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const filtredByName = allClients.filter(({ name }) =>
      name.toLowerCase().includes(nameFilter.toLowerCase()),
    );

    let filtredByCheck = filtredByName;

    if (checkYes) {
      filtredByCheck = filtredByName.filter(({ installments }) =>
        installments?.some(({ itsPaid }) => itsPaid === false),
      );
    }

    const filtredByEmail = filtredByCheck.filter(({ email }) =>
      email.toLowerCase().includes(emailFilter.toLowerCase()),
    );

    setFiltredList(filtredByEmail);
  }, [nameFilter, allClients, checkYes, emailFilter]);

  return (
    <table className="table-auto w-full my-4">
      <thead>
        <tr className="text-left">
          <th className="pr-5">#</th>
          <th>Nome</th>
          <th className="hidden md:table-cell">Email</th>
          <th className="hidden text-center sm:table-cell">Pendências</th>
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
          <td className="hidden md:table-cell">
            <input
              placeholder="Email..."
              className="p-1 my-2 border border-black rounded-md"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
            />
          </td>

          <td className="hidden text-center sm:table-cell">
            <label className="flex items-center justify-center">
              Sim
              <input
                type="checkbox"
                className="p-1 mx-1 border border-black rounded-md"
                checked={checkYes}
                onChange={() => setCheckYes((prev) => !prev)}
              />
            </label>
          </td>
        </tr>
        {filtredList.map((client, index) => (
          <tr key={client.id}>
            <td className="pr-5 max-w-[4rem] truncate">{index + 1}</td>
            <td className="max-w-[1px] truncate">{client.name}</td>
            <td className="hidden max-w-[9rem] truncate md:table-cell">
              {client.email}
            </td>
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
