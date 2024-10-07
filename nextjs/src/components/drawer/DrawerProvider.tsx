import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

export interface IDrawerProviderProps {
  children: ReactNode;
}

const DrawerContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

function DrawerProvider({ children }: IDrawerProviderProps) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export { DrawerContext, DrawerProvider };
