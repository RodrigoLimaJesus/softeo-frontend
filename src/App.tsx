import { Route, Routes } from 'react-router-dom';
import Clients from './components/clients';
import Header from './components/header';
import SideBar from './components/sideBar';
import ClientDetails from './pages/clientDetails';
import Home from './pages/home';

export default function App() {
  return (
    <div>
      <SideBar />
      <div>
        <Header />
        <hr />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/client/:id" element={<ClientDetails />} />
            <Route path="/client" element={<Clients />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
