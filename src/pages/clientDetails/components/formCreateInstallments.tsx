import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IClient from '../../../interfaces/client';
import { IBodyCreateInstallment } from '../../../interfaces/installment';
import { getClientById } from '../../../services/clients';
import { createInstallment } from '../../../services/installments';

export default function FormCreateInstallments({
  handleNewInstallments,
}: {
  handleNewInstallments: (data: IClient | {}) => void;
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
      }
    }
  }

  return (
    <form
      className={`
      overflow-hidden
      ${true ? 'h-auto' : 'h-0'}
      flex flex-col items-center
      border rounded-2xl border-gray-400
      my-3
      `}
      onSubmit={handleSubmit}
    >
      <label>
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

      <label>
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

      <label>
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
        <label>
          Data base para os intervalos:
          <input
            type="date"
            className="border border-black rounded p-1 m-1"
            required
            maxLength={3}
            max="9999-12-31"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={checkToday}
          />
        </label>

        <label>
          <input
            type={'checkbox'}
            checked={checkToday}
            onChange={() => setCheckToday(!checkToday)}
          />
          Hoje
        </label>
      </div>

      <button>Criar</button>
    </form>
  );
}
