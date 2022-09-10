import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IClient from '../../interfaces/client';
import { getClientById } from '../../services/clients';
import ClientInfo from './components/clientInfo';
import InstallmentInfo from './components/installmentInfo';

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientDetail, setClientDetail] = useState<IClient>({} as IClient);
  const [isMounted, setIsMounted] = useState(false);
  const [showError, setShowError] = useState(false);

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

  return showError ? (
    <div>error</div>
  ) : (
    <div className="flex flex-col m-3">
      <ClientInfo clientDetail={clientDetail} />

      <div className="my-6">
        <h2 className="font-bold text-center text-xl">Minhas parcelas</h2>

        <InstallmentInfo clientDetail={clientDetail} />
      </div>
    </div>
  );
}
