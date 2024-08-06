import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';
const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, children }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    console.log('Закрыть модальное окно');
    navigate(-1);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={closeModal}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
