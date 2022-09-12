import { useState } from 'react';
import { BsCardHeading } from 'react-icons/bs';
import {
  MdOutlineAccountCircle,
  MdOutlineEmail,
  MdOutlinePhone,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';
import IClient from '../../../interfaces/client';
import { excludeClient } from '../../../services/clients';

export default function ClientInfo({
  clientDetail,
}: {
  clientDetail: IClient;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleDeleteClient } = useAppContext();

  async function handleDelete() {
    setIsLoading(true);
    const { id } = clientDetail;
    const deleteResponse = await excludeClient(String(id));

    if ('id' in deleteResponse) {
      handleDeleteClient(id);
      navigate('/');
    }
    setIsLoading(false);
  }

  return (
    <div className="self-center">
      <span className="flex items-center text-xl">
        <MdOutlineAccountCircle className="mr-2" />
        {clientDetail.name}
      </span>

      <span className="flex items-center text-xl">
        <BsCardHeading className="mr-2" />
        {clientDetail.cpf}
      </span>

      <span className="flex items-center text-xl">
        <MdOutlineEmail className="mr-2" />
        {clientDetail.email}
      </span>

      <span className="flex items-center text-xl">
        <MdOutlinePhone className="mr-2" />
        {clientDetail.cellNumber}
      </span>

      <div className="flex flex-col justify-center">
        <button
          onClick={() => setConfirmDelete(true)}
          className={`
          bg-red-400 hover:bg-red-600
          transition
          text-white font-bold
          px-4 py-2 my-2
          rounded-md
          ${isLoading && 'animate-pulse'}
          `}
        >
          Exluir cliente
        </button>
        {confirmDelete && (
          <div>
            <span>Tem certeza?</span>
            <button
              disabled={isLoading}
              className="underline mx-2"
              onClick={handleDelete}
            >
              Sim
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="underline mx-2"
            >
              Não
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
