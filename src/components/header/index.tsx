import { FaSyringe } from 'react-icons/fa';
import { MdOutlineMenu, MdOutlineMenuOpen } from 'react-icons/md';
import { useAppContext } from '../../context/appContext';

export default function Header() {
  const { openMenu, handleOpenMenu } = useAppContext();

  return (
    <header
      className="
      font-bold text-containerBlue
      bg-containerWhite
      p-3 md:p-5
      flex items-center
      "
    >
      <button className="text-2xl" onClick={handleOpenMenu}>
        {openMenu ? <MdOutlineMenuOpen /> : <MdOutlineMenu />}
      </button>

      <div className="flex items-center">
        <h1 className="ml-3 mr-2 text-xl md:text-2xl lg:text-3xl">
          Érica Odontologia
        </h1>
        <FaSyringe />
      </div>
    </header>
  );
}
