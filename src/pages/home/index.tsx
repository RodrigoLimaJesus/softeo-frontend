import Clients from '../../components/clients';
import Installments from '../../components/installments';
import { useAppContext } from '../../context/appContext';

export default function Home() {
  const { allInstallments } = useAppContext();
  return (
    <div className="p-3 md:p-5 md:px-16 lg:px-24">
      <Clients />
      <Installments installments={allInstallments} isInHome />
    </div>
  );
}
