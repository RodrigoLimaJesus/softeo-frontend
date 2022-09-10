import { createContext, useContext } from 'react';
import IContext from '../interfaces/context';

export const AppContext = createContext<IContext>({} as IContext);

export const useAppContext = () => useContext(AppContext);
