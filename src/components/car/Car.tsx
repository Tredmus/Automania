import classes from "./Car.module.scss";
// import formatPrice from "../../functions/formatPrice";

export type CarType = {
  additionalPhotos: string[];
  brand: string;
  createdAt: string;
  id: string;
  mainPhoto: string;
  model: string;
  price: number;
  updatedAt: string;
  user: {
    _id: string;
    email: string;
    fullName: string;
  };
  _id: string;
};

export function formatPrice(number: number): string {
  let numberString: string = number.toString();
  let separatedNumber: Array<string | number> = [];

  for (let i = numberString.length - 1; i >= 0; i -= 3) {
    separatedNumber.push(numberString.substring(i - 2, i + 1));
  }
  return separatedNumber.reverse().join(" ");
}

export const Car = ({ car }: { car: CarType }) => {
  const formatedPrice = formatPrice(car.price);

  return (
    <div className={classes.car}>
      <img src={car.mainPhoto} alt="" />

      <div className={classes.carInfo}>
        <h6>
          {car.brand} {car.model}
        </h6>
        <h6 className={classes.price}>{formatedPrice} BGN</h6>
      </div>
    </div>
  );
};
