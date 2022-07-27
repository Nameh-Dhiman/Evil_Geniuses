import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import Home from '../Components/Home';

const MainRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
    </>
    
  )
}

export default MainRoutes