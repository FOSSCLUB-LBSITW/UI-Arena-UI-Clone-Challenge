import { createContext, useState, type ReactNode } from 'react';

interface UIContextValue {
  isSignInOpen: boolean;
  openSignIn: () => void;
  closeSignIn: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isSignInOpen, setSignInOpen] = useState(false);
  return (
    <UIContext.Provider
      value={{
        isSignInOpen,
        openSignIn: () => setSignInOpen(true),
        closeSignIn: () => setSignInOpen(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
