import React, { useContext, useState } from "react";
import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { removeDataFromLocal } from "../Utils/Localstorage";

const Navbar = () => {
  const navigate = useNavigate();
  const { curUser, setCurUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);
  
  const [openPopUp, setOpenPopUp] = useState(false);

  return (
    <div className={styles.Container}>
      <div className={styles.NavContainer}>
        <div className={styles.NavLogo} onClick={() => navigate("/")}>
          <span>EX</span>
          <span>CELL</span>
          <span>IGENT</span>
        </div>
        <div className={styles.NavInfo}>
          <div className={styles.Notification}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </div>
          <div className={styles.Account}>
            <div
              className={
                openPopUp
                  ? `${styles.AccountPopUp}`
                  : `${styles.AccountPopUp} ${styles.HidePopUp}`
              }
            >
              <p
                onClick={() => {
                  setOpenPopUp(!openPopUp);
                }}
              >
                Account Settings
              </p>
              <p
                onClick={() => {
                  setOpenPopUp(!openPopUp);
                }}
              >
                Profile
              </p>
              <p
                onClick={() => {
                  removeDataFromLocal('user');
                  removeDataFromLocal('userId');
                  setCurUser({});
                  setIsLoggedIn(false);
                  setOpenPopUp(!openPopUp);
                  navigate('/signin');
                }}
              >
                Logout
              </p>
            </div>
            {isLoggedIn ? (
              <div
                className={styles.Avatar}
                onClick={() => setOpenPopUp(!openPopUp)}
              >
                {curUser.name[0]}
              </div>
            ) : (
              <div
                className={styles.Avatar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
