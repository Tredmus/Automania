import classes from "./Modal.module.scss";
import { Backdrop } from "./Backdrop";

type Props = {
  onClose: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
  free?: boolean;
};

export const Modal = ({ onClose, onClick, children, free }: Props) => {
  return (
    <>
      <Backdrop onClose={onClose} />

      <div
        onClick={onClick}
        className={`${classes.modal} ${free && classes.free}`}
      >
        {children}
      </div>
    </>
  );
};
