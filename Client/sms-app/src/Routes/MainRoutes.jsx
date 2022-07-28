import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Home from '../components/Home';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

const MainRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
    </>
    
  )
}

export default MainRoutes