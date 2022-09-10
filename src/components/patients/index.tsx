import { useAppContext } from '../../context/appContext';
import ClientList from './components/clientList';

export default function Patients() {
  const { allClients } = useAppContext();

  return (
    <div className="bg-containerWhite rounded-lg p-3">
      <div className="font-bold flex items-center justify-between">
        <h2>MEUS PACIENTES</h2>
        <button className="bg-containerBlue text-white p-1 rounded-sm text-sm">
          Novo
        </button>
      </div>

      <div>
        {allClients.length === 0 ? (
          <span className="text-center">Você não possui nenhum paciente.</span>
        ) : (
          <ClientList />
        )}
      </div>
    </div>
  );
}
