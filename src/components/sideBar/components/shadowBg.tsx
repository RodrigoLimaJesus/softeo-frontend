import { useAppContext } from '../../../context/appContext';

export default function ShadowBg() {
  const { openMenu, handleOpenMenu } = useAppContext();
  return (
    <button
      className={`
      fixed top-0 left-0
      h-screen ${openMenu ? 'w-screen' : 'w-0'}
      bg-black/50
      transition-all
      duration-300
      md:hidden
      `}
      onClick={handleOpenMenu}
    />
  );
}
