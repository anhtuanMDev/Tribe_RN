import { createContext, useContext, useState } from "react";
import { CredentialContextType, CredentialState } from "./type";

export const CredentialContext = createContext<CredentialContextType | null>(null);

export const CredentialProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<CredentialState>({});

  const setEmail = (email: string) => {
    setState(prev => ({ ...prev, email }));
  };

  const reset = () => setState({});

  return (
    <CredentialContext.Provider value={{ state, setEmail, reset }}>
      {children}
    </CredentialContext.Provider>
  );
};

export const useCredential = () => {
  const ctx = useContext(CredentialContext);
  if (!ctx) {
    throw new Error('useCredential must be used inside CredentialProvider');
  }
  return ctx;
};
