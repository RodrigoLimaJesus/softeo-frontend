import { useParams } from 'react-router-dom';

export default function ClientDetails() {
  const { id } = useParams();
  return <div>{id}</div>;
}
