import { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import IClient from '../../interfaces/client';

export default function Patients() {
  const [listPatients, setListPatients] = useState<IClient[]>([
    {
      id: 1,
      name: 'Rodrigo Otávio Lima de Jesus',
      cpf: '12312312312',
      email: 'rod@rod.com',
      cellNumber: '12121212121',
      installments: [
        { itsPaid: false, clientId: 1, paymentDate: new Date(), price: 200 },
      ],
    },
  ]);

  return (
    <div className="bg-containerWhite rounded-lg m-2 p-3">
      <div className="font-bold flex items-center justify-between">
        <h2>MEUS PACIENTES</h2>
        <button className="bg-containerBlue text-white p-1 rounded-sm text-sm">
          Novo
        </button>
      </div>

      <div>
        {listPatients.length === 0 ? (
          <span className="text-center">Você não possui nenhum paciente.</span>
        ) : (
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
              {listPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="pr-5 max-w-[4rem] truncate">{patient.id}</td>
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
        )}
      </div>
    </div>
  );
}
