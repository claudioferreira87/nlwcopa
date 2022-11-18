import { createContext, ReactNode, useEffect, useState } from 'react';

export interface StatusBarProps {
  hidden: boolean;
  handleSetHidden: (toggle: boolean) => void;
}

interface StatusBarProviderProps {
  children: ReactNode;
}

export const StatusBarContext = createContext({} as StatusBarProps);

export function StatusBarProvider({ children }: StatusBarProviderProps) {
  const [hidden, setHidden] = useState(false);

  const handleSetHidden = (toggle: boolean) => {
    setHidden(toggle)
  }

  return (
    <StatusBarContext.Provider value={{ hidden, handleSetHidden }}>
      {children}
    </StatusBarContext.Provider>
  )
}
