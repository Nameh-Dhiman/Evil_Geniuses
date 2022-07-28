import React from "react";
import styles from "./Auth.module.scss";

const Signup = () => {
  return (
    <div className={styles.Container}>
      <p className={styles.PageTitle}>Signup</p>
      <form>
        <div className={styles.InputContainer}>
          <input
            placeholder="Enter your firstname.."
            className={styles.ContainerInput}
          />
          <label className={styles.ContainerLabel}>Firstname</label>
        </div>
        <div className={styles.InputContainer}>
          <input
            placeholder="Enter your lastname.."
            className={styles.ContainerInput}
          />
          <label className={styles.ContainerLabel}>Lastname</label>
        </div>
        <div className={styles.InputContainer}>
          <input
            placeholder="Enter your email.."
            className={styles.ContainerInput}
          />
          <label className={styles.ContainerLabel}>Email</label>
        </div>
        <div className={styles.InputContainer}>
          <input
            placeholder="Enter your password.."
            className={styles.ContainerInput}
          />
          <label className={styles.ContainerLabel}>Password</label>
        </div>
        <input
          type="submit"
          value="Register"
          className={styles.Submit}
        />
      </form>
    </div>
  );
};

export default Signup;
