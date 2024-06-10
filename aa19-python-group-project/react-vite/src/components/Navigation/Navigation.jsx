import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";

function Navigation() {
  return (
    <div className="nav-container">
        <NavLink className='betsy-home' to="/">Betsy</NavLink>

      <div className="nav-items">
      <NavLink to='/favorites'><FaRegHeart className="heart-icon"/></NavLink>
        <ProfileButton />
        <NavLink to='/cart'><FiShoppingCart className="cart-image"/></NavLink>
      </div>
        </div>
  );
}

export default Navigation;
