export type CredentialState = {
  email?: string;
};

export type CredentialContextType = {
  state: CredentialState;
  setEmail: (email: string) => void;
  reset: () => void;
};
