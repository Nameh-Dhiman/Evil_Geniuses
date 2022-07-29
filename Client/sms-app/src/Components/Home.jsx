import React from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>Home</div>
  )
}

export default Home