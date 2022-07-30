import React, { useState, useRef, useContext } from "react";
import styles from "./Auth.module.scss";
import axios from 'axios';
import {AuthContext} from '../Context/AuthContext';
import {saveDataToLocal} from '../Utils/Localstorage';
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const {setCurUser, setIsLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();
  // let location = useLocation();
  // let from = location.state?.from?.pathname || "/";
  
  const [formData, setFormData] = useState({});
  const formReset = useRef();

  const signin = async() => {
    await axios.post("http://localhost:8080/api/auth/signin", formData).then((res) => {
      let data = res.data;
      setCurUser({...data});
      setIsLoggedIn(true);
      saveDataToLocal('user', data);
      saveDataToLocal('userId', data._id);
      setTimeout(() => {
        if(data.role === 'student') navigate('/dashboard');
        else if(data.role === 'instructor') navigate('/instructordashboard');
        // navigate(from, { replace: true });
      }, 100);
    }).catch(err => console.log(err));
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
            type="email"
            onChange={changeHandler}
          />
          <label className={styles.ContainerLabel}>Email</label>
        </div>
        <div className={styles.InputContainer}>
          <input
            type="password"
            placeholder="Enter your password.."
            className={styles.ContainerInput}
            name="password"
            onChange={changeHandler}
          />
          <label className={styles.ContainerLabel}>Password</label>
        </div>
        <input type="submit" value="Submit" className={styles.Submit} />
      </form>
      <p className={styles.PageTitle} style={{ fontSize: "1rem" }}>
        Not already a user?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{ color: "#308dfd", cursor: "pointer" }}
        >
          Signup
        </span>
      </p>
    </div>
  );
};

export default Signin;