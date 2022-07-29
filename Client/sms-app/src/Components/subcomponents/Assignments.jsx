import React, { useContext } from "react";
import styles from "./Assignments.module.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getDataFromLocal } from "../../Utils/Localstorage";
import {AuthContext} from "../../Context/AuthContext";

const Assignments = () => {
  const [assign, setAssign] = useState([]);

  const {curUser} = useContext(AuthContext);
  

  const getAssignments = async () => {
    await axios
      .get(`http://localhost:8080/api/studentass/${curUser._id}`) // add userId
      .then((res) => console.log([...res.data]))
      .catch((err) => console.log(err));
  };

  // const markCompleted = async () => {
  //   await axios
  //     .patch(`http://localhost:8080/api/studentass/iscompleted`, {user_id: "62e2691266511978e1568179", assignment_id: ``,iscompleted: completed})
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    getAssignments();
  }, []);

  return (
    <div className={styles.Container}>
      <p className={styles.PageTitle}>Assignments</p>
      <div className={styles.ProgressBar}>
        <div className={styles.Progress} style={{ width: "50%" }}></div>
      </div>
      <div className={styles.Assignments}>
        <div className={styles.Assignment}>
          <div className={styles.AssignmentInfo}>
            <div className={styles.AssignmentTitle}>
              Chat Application using Web Sockets Assignment
            </div>
            <span className={styles.AssignmentTopic}>Coding</span>
          </div>
          <div className={styles.AssignmentInstructor}>Prabhanjan</div>
          <div className={styles.AssignmentStatus}>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
