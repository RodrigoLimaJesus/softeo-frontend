import { useAppContext } from '../../context/appContext';
import Header from '../header';
import ShadowBg from './components/shadowBg';

export default function SideBar() {
  const { openMenu } = useAppContext();

  return (
    <div>
      <ShadowBg />

      <div
        className={`
        fixed top-0 left-0
        h-screen
        ${openMenu ? 'w-[70vw]' : 'w-0'}
        bg-containerWhite
        transition-all
        duration-300
        overflow-hidden
        
        `}
      >
        <div>
          <Header />
        </div>
      </div>
    </div>
  );
}
