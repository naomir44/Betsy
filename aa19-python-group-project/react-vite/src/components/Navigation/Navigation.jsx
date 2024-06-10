import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FiShoppingCart } from "react-icons/fi";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <FiShoppingCart />
      <NavLink to='/favorites'><img className="favorite-icon" src="https://samsclub13.s3.us-west-2.amazonaws.com/favorite-icon.svg"></img></NavLink>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
