import { BsCardHeading } from 'react-icons/bs';
import {
  MdOutlineAccountCircle,
  MdOutlineEmail,
  MdOutlinePhone,
} from 'react-icons/md';
import IClient from '../../../interfaces/client';

export default function ClientInfo({
  clientDetail,
}: {
  clientDetail: IClient;
}) {
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
    </div>
  );
}
