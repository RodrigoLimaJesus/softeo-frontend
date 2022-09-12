import React, { FormEvent, useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import { createClient } from '../../../services/clients';

export default function FormCreateClient({
  showCreateForm,
}: {
  showCreateForm: boolean;
}) {
  const { addNewClient } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [showEmailErr, SetShowEmailErr] = useState(false);
  const [showNameErr, SetShowNameErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    SetShowNameErr(false);
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    SetShowEmailErr(false);
    setEmail(e.target.value);
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^\d*?\d*$/;
    const { value } = e.target;

    if (regex.test(value)) {
      setPhone(e.target.value);
    }
  }

  function handleCpf(e: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^\d*?\d*$/;
    const { value } = e.target;

    if (regex.test(value)) {
      setCpf(e.target.value);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email.includes('.com')) {
      SetShowEmailErr(true);
    } else if (name.length <= 3) {
      SetShowNameErr(true);
    } else {
      setIsLoading(true);
      const newClient = await createClient(name, email, phone, cpf);

      if ('id' in newClient) {
        setName('');
        setEmail('');
        setPhone('');
        setCpf('');
        addNewClient(newClient);
      }

      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
      overflow-hidden
      ${showCreateForm ? 'h-auto border' : 'h-0 border-0'}
      border-gray-400
      flex flex-col items-center
      rounded-2xl
      my-3
      `}
    >
      <div className="flex flex-row flex-wrap justify-center my-4">
        <label className="flex justify-between items-center w-full m-3 sm:w-auto">
          Nome:
          <div className="relative">
            <input
              placeholder="Nome"
              className="border border-black rounded p-1 m-1"
              required
              minLength={3}
              value={name}
              onChange={handleName}
            />
            {showNameErr && (
              <span className="absolute -bottom-5 left-2 text-sm text-red-500">
                Insira um nome maior que 3 letras.
              </span>
            )}
          </div>
        </label>

        <label className="flex justify-between items-center w-full m-3 sm:w-auto">
          E-mail:
          <div className="relative">
            <input
              placeholder="E-mail"
              type="email"
              required
              className="border border-black rounded p-1 m-1"
              value={email}
              onChange={handleEmail}
            />
            {showEmailErr && (
              <span className="absolute -bottom-5 left-2 text-sm text-red-500">
                Inclua um ".com" no e-mail
              </span>
            )}
          </div>
        </label>

        <label className="flex justify-between items-center w-full m-3 sm:w-auto">
          Telefone:
          <input
            placeholder="Telefone"
            className="border border-black rounded p-1 m-1"
            minLength={11}
            maxLength={11}
            required
            value={phone}
            onChange={handlePhone}
          />
        </label>

        <label className="flex justify-between items-center w-full m-3 sm:w-auto">
          CPF:
          <input
            placeholder="CPF"
            className="border border-black rounded p-1 m-1"
            minLength={11}
            maxLength={11}
            required
            value={cpf}
            onChange={handleCpf}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`
        transition
        disabled:bg-slate-400
        bg-green-400 hover:bg-green-600
        font-bold
        px-4 py-2 my-3
        rounded-md
        border border-black
        ${isLoading && 'animate-pulse'}
        `}
      >
        Cadastrar
      </button>
    </form>
  );
}
