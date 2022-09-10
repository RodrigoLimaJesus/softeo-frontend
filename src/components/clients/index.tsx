import { useAppContext } from '../../context/appContext';
import ClientList from './components/clientList';

export default function Clients() {
  const { allClients } = useAppContext();

  return (
    <div className="bg-containerWhite rounded-lg p-3 md:p-5 md:px-16 lg:px-24">
      <div className="font-bold flex items-center justify-between">
        <h2 className="md:text-xl">MEUS PACIENTES</h2>
        <button className="bg-containerBlue text-white p-1 rounded-sm text-sm md:text-base">
          Novo
        </button>
      </div>

      <div className="overflow-auto">
        {allClients.length === 0 ? (
          <span className="text-center">Você não possui nenhum paciente.</span>
        ) : (
          <ClientList />
        )}
      </div>
    </div>
  );
}
