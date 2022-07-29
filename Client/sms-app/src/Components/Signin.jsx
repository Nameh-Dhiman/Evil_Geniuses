import React, { useState, useRef, useContext } from "react";
import styles from "./Auth.module.scss";
import axios from 'axios';
import {AuthContext} from '../Context/AuthContext';

const Signin = () => {
  const {curUser, setCurUser, isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  
  const [formData, setFormData] = useState({});
  const formReset = useRef();

  const signin = async() => {
    await axios.post("http://localhost:8080/api/auth/signin", formData).then((res) => console.log(res)).catch(err => console.log(err));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    formReset.current.reset();
    signin();
  };

  const changeHandler = (e) => {
    let input = e.target.name;
    setFormData({
      ...formData,
      [input]: e.target.value,
    });
  };

  return (
    <div className={styles.Container} style={{ height: "50vh" }}>
      <p className={styles.PageTitle}>Signin</p>
      <form onSubmit={submitHandler} ref={formReset}>
        <div className={styles.InputContainer}>
          <input
            placeholder="Enter your email.."
            className={styles.ContainerInput}
            name="email"
            onChange={changeHandler}
          />
          <label className={styles.ContainerLabel}>Email</label>
        </div>
        <div className={styles.InputContainer}>
          <input
            placeholder="Enter your password.."
            className={styles.ContainerInput}
            name="password"
            onChange={changeHandler}
          />
          <label className={styles.ContainerLabel}>Password</label>
        </div>
        <input type="submit" value="Submit" className={styles.Submit} />
      </form>
    </div>
  );
};

export default Signin;