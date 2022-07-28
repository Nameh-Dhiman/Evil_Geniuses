import React from 'react';
import styles from "./Auth.module.scss";

const Signin = () => {
  return (
    <div className={styles.Container} style={{ height: "50vh" }}>
      <p className={styles.PageTitle}>Signin</p>
      <form>
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
        <input type="submit" value="Submit" className={styles.Submit} />
      </form>
    </div>
  );
};

export default Signin;