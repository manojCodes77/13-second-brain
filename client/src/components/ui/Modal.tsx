import { useNavigate } from 'react-router-dom';

interface ModalProps {
    children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');
  }

  return (
    <>
      <div 
        onClick={closeHandler} 
        className="fixed top-0 left-0 w-full h-screen bg-black/60 z-10"
      />
    <dialog 
      open 
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none rounded-md shadow-md overflow-hidden z-50 p-10"
    >
      {children}
    </dialog>
    </>
  );
}

export default Modal;