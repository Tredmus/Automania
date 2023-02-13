import { useEffect, useState } from "react";
import classes from "./Home.module.scss";
import axios from "axios";
import { Car, CarType } from "../../components/car/Car";

export const Home = () => {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState<CarType[]>([]);
  // const axios = require("axios");

  useEffect(() => {
    axios
      .post("https://automania.herokuapp.com/listing/list")
      .then(function (response: { data: any }) {
        setData(response.data);
        setCars(response.data.payload.docs);
        console.log("===========", response.data.payload.docs);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.home}>
      <header className={classes.header}>
        <h4>Car Listings ({cars.length})</h4>
      </header>
      <div className={classes.carList}>
        {cars.map((car: CarType) => (
          <Car key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};
