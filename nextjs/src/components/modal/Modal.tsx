import React, { useEffect, useRef } from 'react';
import { useModal } from '@/hooks/useModal';
import { CrossIcon } from '../asset/CrossIcon';
import { cn } from '@/lib/utils';

interface ModalProps {
  isFullScreen?: boolean;
  dialogMethod?: 'show' | 'showModal';
  modalClassName?: string;
  title?: string;
  content?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isModalOpen, modalProps, closeModal } = useModal();
  const {
    isFullScreen = false,
    dialogMethod = 'showModal',
    modalClassName,
    title,
    content,
  } = modalProps as ModalProps;

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isModalOpen) {
      dialogMethod === 'show' ? dialogElement.show() : dialogElement.showModal();
    } else {
      dialogElement.close();
    }

    const handleCloseEvent = () => closeModal();
    dialogElement.addEventListener('close', handleCloseEvent);
    return () => dialogElement.removeEventListener('close', handleCloseEvent);
  }, [isModalOpen, closeModal, dialogMethod]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'modal',
        isFullScreen ? 'w-screen h-screen p-0 m-0' : 'modal-bottom sm:modal-middle',
      )}
    >
      <div
        className={cn(
          isFullScreen ? 'fixed inset-0 w-full h-full max-w-none p-8 overflow-y-auto' : 'modal-box',
          'bg-white',
          modalClassName,
        )}
      >
        <div className="flex w-full justify-end sticky top-0 z-10">
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <CrossIcon isOpen={true} size="md" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="mt-4">
          {title && <h2 className="text-3xl font-bold text-center sticky top-12 z-10">{title}</h2>}
          <div className="mt-4 overflow-y-auto">{content || 'Default Content'}</div>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
