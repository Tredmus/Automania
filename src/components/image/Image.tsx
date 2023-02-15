import classes from "./Image.module.scss";
import { shortenImageName } from "../../functions/shortenImageName";

type Props = {
  name: string | null;
  onClick?: () => void;
};

export const Image = ({ name, onClick }: Props) => {
  if (name && name.length > 1) {
    name = shortenImageName(name);
  }

  return (
    <div className={`${classes.image} btn photoBtn active`}>
      {name}
      <img src="images/x.svg" alt="" onClick={onClick} />
    </div>
  );
};
