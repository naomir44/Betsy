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
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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
  };

  const onClick = (e) => {
    e.preventDefault();
    closeMenu();
    closeModal();
    navigate('/products/new');
  }

  return (
    <>
     <button className="fa-circle" onClick={toggleMenu}>
     <PiUserCirclePlusDuotone className="profile-icon"/>
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>
              {/* <NavLink to={`/products/new`}> */}
                <button className='create-product-button' onClick={onClick}>Create a New Product</button>
              {/* </NavLink> */}
              </div>
              <div>
                <button onClick={logout}>Log Out</button>
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
    </>
  );
}

export default ProfileButton;
