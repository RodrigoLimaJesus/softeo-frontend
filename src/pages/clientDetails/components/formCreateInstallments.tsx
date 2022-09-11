import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IClient from '../../../interfaces/client';
import { IBodyCreateInstallment } from '../../../interfaces/installment';
import { getClientById } from '../../../services/clients';
import { createInstallment } from '../../../services/installments';

export default function FormCreateInstallments({
  handleNewInstallments,
  showCreateForm,
}: {
  handleNewInstallments: (data: IClient | {}) => void;
  showCreateForm: boolean;
}) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [intervalDay, setIntervalDay] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [checkToday, setCheckToday] = useState(true);

  const { id: clientId } = useParams();

  useEffect(() => {
    if (checkToday) {
      const today = new Date();
      let day = today.getDate().toLocaleString();
      let month = (today.getMonth() + 1).toLocaleString();
      const year = today.getFullYear();

      if (Number(day) < 10) {
        day = `0${day}`;
      }

      if (Number(month) < 10) {
        month = `0${month}`;
      }

      setStartDate(`${year}-${month}-${day}`);
    }
  }, [checkToday]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (clientId) {
      const createInfo: IBodyCreateInstallment = {
        clientId: Number(clientId),
        price: Number(price),
        quantity: Number(quantity),
        intervalDay: Number(intervalDay),
        startDate: startDate.replace(/-/g, '/'),
      };

      const response = await createInstallment(createInfo);

      if ('count' in response) {
        const updatedData = await getClientById(clientId);
        handleNewInstallments(updatedData);
        setPrice('');
        setQuantity('');
        setIntervalDay('30');
        setCheckToday(true);
      }
    }
  }

  return (
    <form
      className={`
      overflow-hidden
      ${showCreateForm ? 'h-auto my-4 p-3 border' : 'h-0 m-0 p-0 border-0'}
      rounded-2xl border-gray-400
      flex flex-col
      `}
      onSubmit={handleSubmit}
    >
      <label className="my-2">
        Valor das parcelas:
        <input
          type="number"
          min={0}
          required
          className="border border-black rounded p-1 m-1"
          placeholder="Valor das parcelas..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <label className="my-2">
        Quantidade de parcelas:
        <input
          type="number"
          min={1}
          className="border border-black rounded p-1 m-1"
          placeholder="Quantidade de parcelas..."
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>

      <label className="my-2">
        Intervalo entre os dias de vencimento:
        <input
          type={'number'}
          min={1}
          required
          className="border border-black rounded p-1 m-1"
          placeholder="Intervalo..."
          value={intervalDay}
          onChange={(e) => setIntervalDay(e.target.value)}
        />
      </label>

      <div>
        <label className="my-2">
          Data base para os intervalos:
          <input
            type="date"
            className="border border-black rounded p-1 m-1 disabled:text-gray-400"
            required
            max="9999-12-31"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={checkToday}
          />
        </label>

        <label className="my-2">
          <input
            className="mx-1"
            type={'checkbox'}
            checked={checkToday}
            onChange={() => setCheckToday(!checkToday)}
          />
          Hoje
        </label>
      </div>

      <button
        type="submit"
        className="
        transition
        bg-containerBlue hover:bg-containerBlue/75
        my-4 py-2 px-6
        text-white font-bold
        rounded-lg
        self-center
        "
      >
        Criar
      </button>
    </form>
  );
}
