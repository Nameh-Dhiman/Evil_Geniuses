import React, { useState, useRef } from "react";
import styles from "./Auth.module.scss";

const Signup = () => {

  const [formData, setFormData] = useState({});
  const formReset = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    formReset.current.reset();
    console.log(formData);
  };

  const changeHandler = (e) => {
    let input = e.target.name;
    setFormData({
      ...formData,
      [input]: e.target.value,
    });
  };


  return (
    <div className={styles.Container}>
      <p className={styles.PageTitle}>Signup</p>
      <form onSubmit={submitHandler} ref={formReset}>
        <div className={styles.InputContainer}>
          <input
            placeholder="Enter your firstname.."
            className={styles.ContainerInput}
            name="firstname"
            onChange={changeHandler}
          />
          <label className={styles.ContainerLabel}>Firstname</label>
        </div>
        <div className={styles.InputContainer}>
          <input
            placeholder="Enter your lastname.."
            className={styles.ContainerInput}
            name="lastname"
            onChange={changeHandler}
          />
          <label className={styles.ContainerLabel}>Lastname</label>
        </div>
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
            type="password"
            name="password"
            onChange={changeHandler}
          />
          <label className={styles.ContainerLabel}>Password</label>
        </div>
        <input type="submit" value="Register" className={styles.Submit} />
      </form>
    </div>
  );
};

export default Signup;
