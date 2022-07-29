import React, { useContext, useEffect, useState } from "react";
import Chart from './Chart';
import {AuthContext} from "../../Context/AuthContext";
import axios from "axios";
import styles from "./Grades.module.scss";

const Grades = () => {
  const {curUser} = useContext(AuthContext);
  const [gradesData, setGradesData] = useState([]);

  const getGrades = async() => {
    let res = await axios.get(`http://localhost:8080/api/users/${curUser._id}`);
    let marks = res.data.marks;
    let marksArr=[];
    for(let el in marks){
      if(typeof(marks[el]) == "number"){
        marksArr.push(marks[el]);
      }
    }
    setGradesData([...marksArr]);
  };

  useEffect(() => {
    getGrades();
  }, []);

  return (
    <div className={styles.Container}>
      <p className={styles.PageTitle}>Grades</p>
      <div className={styles.StudentInfo}>
        <div className={styles.Chart}>
          <Chart gradesData={gradesData} />
        </div>
        <div className={styles.Text}>
          <div className={styles.Student}>Student: {curUser.name}</div>
          <div className={styles.Unit}>Unit: {curUser.unit}</div>
        </div>
      </div>
    </div>
  );
}

export default Grades