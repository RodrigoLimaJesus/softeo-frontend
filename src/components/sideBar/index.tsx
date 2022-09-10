import { useId } from 'react';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Header from '../header';
import ShadowBg from './components/shadowBg';

export default function SideBar() {
  const { openMenu, handleOpenMenu } = useAppContext();
  const links = [
    { id: useId(), path: '/', label: 'Home' },
    { id: useId(), path: '/client', label: 'Cliente' },
  ];

  return (
    <div>
      <ShadowBg />

      <div
        className={`
        fixed top-0 left-0 md:relative
        ${openMenu ? 'h-screen' : 'h-0'}
        ${openMenu ? 'w-[50vw] md:w-[25vw] lg:w-[15vw]' : 'w-0'}
        
        bg-containerBlue
        text-white
        transition-all
        duration-300
        overflow-hidden
        `}
      >
        <div>
          <div className="md:hidden">
            <Header />
          </div>

          <div className="flex justify-center text-6xl my-4">
            <MdOutlineAccountCircle />
          </div>

          <nav className="flex flex-col items-center my-4">
            {links.map(({ id, path, label }) => (
              <NavLink
                key={id}
                to={path}
                onClick={handleOpenMenu}
                className={({ isActive }) => {
                  return `
                    p-2 transition font-bold text-lg
                    ${isActive ? 'text-yellow-300 underline' : ''}
                  `;
                }}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
