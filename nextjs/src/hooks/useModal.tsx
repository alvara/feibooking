import { useContext } from 'react';
import { ModalContext } from '@/providers/ModalProvider';

export interface ModalPropsInterface {
  isFullScreen?: boolean;
  dialogMethod?: 'show' | 'showModal';
  modalClassName?: string;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  console.log('useModal called, context:', context);
  return context;
};
