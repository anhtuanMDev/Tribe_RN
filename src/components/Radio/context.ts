import { createContext, useContext } from 'react';
import { RadioContextValue } from './type';

export const RadioContext = createContext<RadioContextValue | null>(null);

export const useRadio = () => {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error('useRadio must be used inside <Radio.Group>');
  return ctx;
};
