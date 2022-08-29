import axios from "axios";
import React, { useRef, useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import styles from "./InstructorAssignments.module.scss";

const InstructorAssignments = () => {
  const [formData, setFormData] = useState({});
  const form = useRef();

  const { curUser } = useContext(AuthContext);

  const createAssignment = async () => {
    await axios
      .post(`https://execelligent.herokuapp.com/api/assignments`, {
        ...formData,
        instructor: curUser._id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    form.current.reset();
    createAssignment();
  };

  const changeHandler = (e) => {
    let inputName = e.target.name;
    if (inputName === "deadline") {
      let dateString = new Date(e.target.value);
      setFormData({
        ...formData,
        [inputName]: dateString.toString(),
      });
    } else if (inputName === "unit") {
      setFormData({
        ...formData,
        [inputName]: parseInt(e.target.value),
      });
    } else {
      setFormData({
        ...formData,
        [inputName]: e.target.value,
      });
    }
  };

  return (
    <div className={styles.Container}>
      <p className={styles.PageTitle}>Create Assignment</p>
      <div className={styles.AssignmentForm}>
        <p className={styles.PageTitle} style={{ fontSize: "1.2rem" }}>
          Assignment Details
        </p>
        <form onSubmit={submitHandler} ref={form}>
          <div className={styles.InputContainer}>
            <input
              placeholder="Enter Assignment Title..."
              className={styles.ContainerInput}
              name="name"
              onChange={changeHandler}
            />
            <label className={styles.ContainerLabel}>Assignment Title</label>
          </div>
          <div className={styles.SelectInputs}>
            <select name="topic" onChange={changeHandler}>
              <option value="">Select Course</option>
              <option value="dsa">DSA</option>
              <option value="coding">CODING</option>
              <option value="csbt">CSBT</option>
            </select>
            <select name="unit" onChange={changeHandler}>
              <option value="">Select Unit</option>
              <option value="1">Unit 1</option>
              <option value="2">Unit 2</option>
              <option value="3">Unit 3</option>
              <option value="4">Unit 4</option>
              <option value="4">Unit 5</option>
              <option value="4">Unit 6</option>
            </select>
          </div>
          <div className={styles.deadline}>
            <span
              className={styles.PageTitle}
              style={{ fontSize: "1rem", paddingRight: "1rem" }}
            >
              Deadline
            </span>
            <input
              type="datetime-local"
              name="deadline"
              onChange={changeHandler}
            />
          </div>
          <textarea
            name="description"
            placeholder="Enter Description..."
            onChange={changeHandler}
          ></textarea>
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export default InstructorAssignments;
