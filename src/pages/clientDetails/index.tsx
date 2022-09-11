import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Installments from '../../components/installments';
import IClient from '../../interfaces/client';
import { getClientById } from '../../services/clients';
import ClientInfo from './components/clientInfo';
import FormCreateInstallments from './components/formCreateInstallments';

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientDetail, setClientDetail] = useState<IClient>({} as IClient);
  const [isMounted, setIsMounted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    async function getClientData() {
      const clientInfo = await getClientById(id);

      if ('name' in clientInfo) {
        setClientDetail(clientInfo);
        setIsMounted(true);
      } else {
        setShowError(true);
      }
    }

    if (!isMounted) {
      getClientData();
    }

    return setIsMounted(true);
  }, [id, isMounted, navigate]);

  function handleNewInstallments(updatedData: IClient | {}) {
    if ('id' in updatedData) {
      setClientDetail(updatedData);
    }
  }

  return showError ? (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-lg">Nenhum cliente encontrado.</h2>
      <NavLink to="/" className="text-sky-600 hover:underline">
        Voltar ao início
      </NavLink>
    </div>
  ) : (
    <div className="flex flex-col m-3">
      <ClientInfo clientDetail={clientDetail} />

      <div className="my-6 sm:mx-10 md:mx-14 lg:mx-24">
        <div className="font-bold flex items-center justify-between">
          <h2 className="md:text-xl">MINHAS PARCELAS</h2>
          <button
            className="
          transition
          bg-containerBlue hover:bg-containerBlue/75
          text-white
          p-1 px-2
          rounded-sm
          text-sm md:text-base"
            onClick={() => setShowCreateForm((prev) => !prev)}
          >
            Nova
          </button>
        </div>

        <FormCreateInstallments
          handleNewInstallments={handleNewInstallments}
          showCreateForm={showCreateForm}
        />

        <Installments installments={clientDetail.installments} />
      </div>
    </div>
  );
}
