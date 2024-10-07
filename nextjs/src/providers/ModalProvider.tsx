import type { ReactElement } from 'react';
import React, { createContext, useState } from 'react';

interface ModalPropsInterface {
  title?: string;
  content?: ReactElement;
  isFullScreen?: boolean;
  modalClassName?: string;
  dialogMethod?: 'show' | 'showModal';
  onClose?: () => void;
}

interface ModalContextType {
  isModalOpen: boolean;
  modalProps: ModalPropsInterface;
  openModal: (props: ModalPropsInterface) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  modalProps: {}, // Initialize with an empty object
  openModal: () => {},
  closeModal: () => {},
});

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalPropsInterface>({});

  const openModal = (props: ModalPropsInterface) => {
    console.log('openModal called in ModalProvider', props);
    setModalProps(props);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('closeModal called in ModalProvider');
    setIsModalOpen(false);
    setModalProps({});
  };

  console.log('ModalProvider render, isModalOpen:', isModalOpen);

  return (
    <ModalContext.Provider value={{ isModalOpen, modalProps, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
