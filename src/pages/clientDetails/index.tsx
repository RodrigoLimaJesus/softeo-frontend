import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Installments from '../../components/installments';
import { useAppContext } from '../../context/appContext';
import IClient from '../../interfaces/client';
import ClientInfo from './components/clientInfo';

export default function ClientDetails() {
  const { id: clientId } = useParams();
  const { allClients } = useAppContext();
  const navigate = useNavigate();
  const [clientDetail, setClientDetail] = useState<IClient>({} as IClient);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const clientInfo =
      allClients.find(({ id }) => Number(id) === Number(clientId)) ||
      ({} as IClient);

    if ('name' in clientInfo) {
      setClientDetail(clientInfo);
    }

    return setIsMounted(true);
  }, [allClients, clientId, isMounted, navigate]);

  return !('name' in clientDetail) ? (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-lg">Nenhum cliente encontrado.</h2>
      <NavLink to="/" className="text-sky-600 hover:underline">
        Voltar ao início
      </NavLink>
    </div>
  ) : (
    <div className="flex flex-col m-3">
      <ClientInfo clientDetail={clientDetail} />

      <Installments installments={clientDetail.installments} />
    </div>
  );
}
