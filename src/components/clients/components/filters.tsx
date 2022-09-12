import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import IClient from '../../../interfaces/client';

export default function Filters({
  setFiltredList,
}: {
  setFiltredList: Dispatch<SetStateAction<IClient[]>>;
}) {
  const { allClients } = useAppContext();

  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [checkYes, setCheckYes] = useState(false);

  useEffect(() => {
    const filtredByName = allClients.filter(({ name }) =>
      name.toLowerCase().includes(nameFilter.toLowerCase()),
    );

    let filtredByCheck = filtredByName;

    if (checkYes) {
      filtredByCheck = filtredByName.filter(({ installments }) =>
        installments?.some(({ itsPaid }) => itsPaid === false),
      );
    }

    const filtredByEmail = filtredByCheck.filter(({ email }) =>
      email.toLowerCase().includes(emailFilter.toLowerCase()),
    );

    const filtredByPhone = filtredByEmail.filter(({ cellNumber }) =>
      cellNumber.toLowerCase().includes(phoneFilter.toLowerCase()),
    );

    setFiltredList(filtredByPhone);
  }, [
    nameFilter,
    allClients,
    checkYes,
    emailFilter,
    setFiltredList,
    phoneFilter,
  ]);

  return (
    <tr>
      <td></td>

      <td>
        <input
          placeholder="Nome..."
          className="
          p-1
          my-2
          border border-black
          rounded-md
          "
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </td>

      <td className="hidden md:table-cell">
        <input
          placeholder="E-mail..."
          className="p-1 my-2 border border-black rounded-md"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
      </td>

      <td className="hidden w- lg:table-cell">
        <input
          placeholder="Telefone..."
          className="p-1 my-2 border border-black rounded-md"
          value={phoneFilter}
          onChange={(e) => setPhoneFilter(e.target.value)}
        />
      </td>

      <td className="hidden text-center sm:table-cell">
        <label className="flex items-center justify-center">
          Sim
          <input
            type="checkbox"
            className="p-1 mx-1 border border-black rounded-md"
            checked={checkYes}
            onChange={() => setCheckYes((prev) => !prev)}
          />
        </label>
      </td>
    </tr>
  );
}
