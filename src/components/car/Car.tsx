import classes from "./Car.module.scss";
import { formatPrice } from "../../functions/formatPrice";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Backdrop } from "../Modal/Backdrop";

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

type Props = {
  car: CarType;
  isDeleted: () => void;
};

const userId = localStorage.getItem("id");

export const Car = ({ car, isDeleted }: Props) => {
  const navigate = useNavigate();
  const formatedPrice = formatPrice(car.price);
  const [isManaged, setIsManaged] = useState(false);
  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  document.addEventListener("click", (e) => {
    setIsManaged(false);
  });

  const handleManage = (e: any) => {
    setIsManaged(!isManaged);
    e.stopPropagation();
  };

  const openModal = () => {
    setModal(true);
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `https://automania.herokuapp.com/listing/${car._id}`,
        {
          data: { userId: userId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      isDeleted();
      setModal(false);
    }
  };

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)} free={true}>
          <div className={classes.delete}>
            <h4>Delete Listing</h4>

            <p>
              Are you sure you want to delete this listing from the platform?
            </p>

            <div className={classes.buttons}>
              <div
                className={`${classes.btn} btn btn--white btn--big`}
                onClick={() => setModal(false)}
              >
                Go Back
              </div>
              <div
                className={`${classes.btn} btn btn--pink btn--big`}
                onClick={onDelete}
              >
                Delete
              </div>
            </div>
          </div>
        </Modal>
      )}

      <div className={classes.car}>
        <img src={car.mainPhoto} alt="" className={classes.main} />
        {userId === car.user._id && (
          <div className={`${classes.manage} `}>
            <div className="btn" onClick={handleManage}>
              <img
                src="images/settings.svg"
                alt=""
                className={classes.settings}
                onClick={() => {
                  setBackdrop(true);
                }}
              />
              <span>Manage</span>
            </div>
            {isManaged && (
              <>
                {backdrop && (
                  <div
                    className={classes.backdrop}
                    onClick={() => setBackdrop(false)}
                  />
                )}
                <ul className={classes.menu}>
                  <span className={classes.mobile}>
                    <span>Please select</span>
                  </span>

                  <li
                    onClick={() => {
                      navigate(`/listing?${car._id}`);
                    }}
                  >
                    <div className={classes.imageWrapper}>
                      <img src="images/pencil.svg" alt="" />
                    </div>{" "}
                    <span>Edit Listing</span>
                  </li>
                  <li onClick={openModal}>
                    <div className={classes.imageWrapper}>
                      <img src="images/trash.svg" alt="" />
                    </div>{" "}
                    <span>Delete Listing</span>
                  </li>
                </ul>
              </>
            )}
          </div>
        )}

        <div className={classes.carInfo}>
          <h6>
            {car.brand} {car.model}
          </h6>
          <h6 className={classes.price}>{formatedPrice} BGN</h6>
        </div>
      </div>
    </>
  );
};
