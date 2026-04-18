import { createContext, useContext } from 'react';
import { CheckboxContextValue } from './type';

export const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export const useCheckbox = () => {
  const ctx = useContext(CheckboxContext);
  if (!ctx) throw new Error('useCheckbox must be used inside <Checkbox.Group>');
  return ctx;
};
