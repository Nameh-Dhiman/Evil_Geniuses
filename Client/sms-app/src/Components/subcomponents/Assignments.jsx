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
      .get(`http://localhost:8080/api/studentass/${curUser._id}`)
      .then((res) => setAssign([...res.data]))
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
        {assign.map((el) => (
          <>
            <div className={styles.Assignment} key={el._id}>
              <div className={styles.AssignmentInfo}>
                <div className={styles.AssignmentTitle}>
                  {el.assignment.name}
                </div>
                <span className={styles.AssignmentTopic}>
                  {el.assignment.topic}
                </span>
              </div>
              <div className={styles.AssignmentInstructor}>
                {el.assignment.instructor.name}
              </div>
              <div className={styles.AssignmentStatus}>
                <input type="checkbox" checked={el.isCompleted}/>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
