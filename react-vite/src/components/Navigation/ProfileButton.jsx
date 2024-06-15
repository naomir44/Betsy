import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PiUserCirclePlusDuotone } from "react-icons/pi";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import './Navigation.css'
import { useModal } from "../../context/Modal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const { closeModal } = useModal()
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  const newProduct = (e) => {
    e.preventDefault();
    closeMenu();
    closeModal();
    navigate('/products/new');
  }

  const myProducts = (e) => {
    e.preventDefault()
    closeMenu();
    closeModal();
    navigate('/user/products');
  }

  return (
    <div className="profile-button-container">
     <button className="fa-circle" onClick={toggleMenu}>
     <PiUserCirclePlusDuotone className="profile-icon"/>
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              {/* <div className="nav-username">Hello, {user.username}!</div>
              <div className="nav-email">{user.email}</div> */}
              <div>
                <button className='create-product-button' onClick={newProduct}>Create a New Product</button>
              </div>
              <div>
                <button className="edit-product-button" onClick={myProducts}>My Products</button>
              </div>
              <div>
                <button className="nav-logout" onClick={logout}>Log Out</button>
              </div>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
