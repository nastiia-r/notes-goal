import React, { useState, useContext, ReactNode } from "react";

const AppContext = React.createContext<AppContextProps | undefined>(undefined);

type AppContextProps = {
  modalIsOpen: boolean;
  sidebarIsOpen: boolean;
  showModal: () => void;
  closeModal: () => void;
  showSidebar: () => void;
  closeSidebar: () => void;
};

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const showModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const showSidebar = () => {
    setSidebarIsOpen(true);
  };
  const closeSidebar = () => {
    setSidebarIsOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        modalIsOpen,
        sidebarIsOpen,
        showModal,
        closeModal,
        showSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};
export { AppContext, AppProvider };
