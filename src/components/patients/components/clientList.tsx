import { MdInfoOutline } from 'react-icons/md';
import { useAppContext } from '../../../context/appContext';

export default function ClientList() {
  const { allClients } = useAppContext();

  return (
    <table className="table-auto my-8 w-full">
      <thead>
        <tr className="text-left">
          <th>#</th>
          <th>Nome</th>
          <th className="hidden">Pendências</th>
          <th>Detalhes</th>
        </tr>
      </thead>

      <tbody>
        {allClients.map((patient, index) => (
          <tr key={patient.id}>
            <td className="pr-5 max-w-[4rem] truncate">{index + 1}</td>
            <td className="pr-3 max-w-[9rem] truncate">{patient.name}</td>
            <td className="hidden text-white">
              {patient.installments?.some(
                ({ itsPaid }) => itsPaid === false,
              ) ? (
                <span className="bg-red-500 p-1 rounded-lg">Sim</span>
              ) : (
                <span className="bg-green-500 p-1 rounded-lg">Não</span>
              )}
            </td>
            <td>
              <button className="p-3">
                <MdInfoOutline />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
