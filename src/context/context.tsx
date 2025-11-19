import React, { createContext, useState, useContext } from "react";

interface ModalContextType {
  showRegister: boolean;
  setShowRegister: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ showRegister, setShowRegister }}>
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};