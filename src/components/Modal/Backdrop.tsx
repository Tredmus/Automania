import classes from "./Modal.module.scss";

type Props = { onClose: () => void; children?: React.ReactNode };

export const Backdrop = ({ onClose, children }: Props) => {
  return (
    <div className={classes.backdrop} onClick={onClose}>
      {children}
    </div>
  );
};
