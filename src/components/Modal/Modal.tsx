import { FC, ReactNode, MouseEvent } from "react";
import "./Modal.scss";

interface IModal {
  children: ReactNode;
  closeModal: (bool: boolean) => void;
}

const Modal: FC<IModal> = (props) => {
  const { children, closeModal } = props;
  const handleCloseModal = () => {
    closeModal(false);
  };

  const handleChildClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal" onClick={handleChildClick}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
