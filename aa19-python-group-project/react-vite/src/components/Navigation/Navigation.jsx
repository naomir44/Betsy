import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import FavoritesPage from "../FavoritesPage/FavoritesPage";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>

      <li>
        <FavoritesPage />
      </li>
    </ul>
  );
}

export default Navigation;
