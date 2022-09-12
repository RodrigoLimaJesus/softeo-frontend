import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import ClientList from './components/clientList';
import FormCreateClient from './components/formCreateClient';

export default function Clients() {
  const { allClients } = useAppContext();
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="bg-containerWhite rounded-lg p-3 my-4 md:p-5 md:px-16 lg:px-24">
      <div className="font-bold flex items-center justify-between">
        <h2 className="md:text-xl">MEUS PACIENTES</h2>
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="
          transition
          bg-containerBlue hover:bg-containerBlue/75
          text-white
          p-1 px-2
          rounded-sm
          text-sm md:text-base"
        >
          Novo
        </button>
      </div>

      <FormCreateClient showCreateForm={showCreateForm} />

      <div>
        {allClients.length === 0 ? (
          <h2 className="text-center my-5">Você não possui nenhum paciente.</h2>
        ) : (
          <ClientList />
        )}
      </div>
    </div>
  );
}
