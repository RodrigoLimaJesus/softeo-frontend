import { useState } from 'react';
import { FaSyringe } from 'react-icons/fa';
import { MdOutlineMenu, MdOutlineMenuOpen } from 'react-icons/md';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header
      className="
      font-bold text-containerBlue
      bg-containerWhite
      p-3
      flex items-center
      "
    >
      <button className="text-2xl" onClick={() => setOpenMenu((prev) => !prev)}>
        {openMenu ? <MdOutlineMenuOpen /> : <MdOutlineMenu />}
      </button>

      <div className="flex items-center">
        <h1 className="ml-3 mr-2 text-xl">Érica Odontologia</h1>
        <FaSyringe />
      </div>
    </header>
  );
}
