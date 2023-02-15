import { Route, Routes as Pages } from "react-router-dom";
import { Home } from "../../pages/home/Home";
import { Listing } from "../../pages/listing/Listing";
import { Login } from "../../pages/login/Login";

export const Routes = () => {
  return (
    <Pages>
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/login" element={<Login />} />
    </Pages>
  );
};
