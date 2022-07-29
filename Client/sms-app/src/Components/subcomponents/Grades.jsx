import React, { useContext, useEffect, useState } from "react";
import Chart from './Chart';
import {AuthContext} from "../../Context/AuthContext";
import axios from "axios";

const Grades = () => {
  const {curUser} = useContext(AuthContext);
  const [gradesData, setGradesData] = useState({});

  const getGrades = async() => {
    await axios.get(`http://localhost:8080/api/users/${curUser._id}`).then((res) => console.log(res)).catch(err => console.log(err));
  };

  useEffect(() => {
    getGrades();
  }, []);

  return (
    <Chart />
  )
}

export default Grades