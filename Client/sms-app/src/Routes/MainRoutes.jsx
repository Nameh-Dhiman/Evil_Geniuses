import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Home from '../components/Home';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Assignments from '../components/subcomponents/Assignments';
import Grades from '../components/subcomponents/Grades';
import PocketBuddy from '../components/subcomponents/PocketBuddy';

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="grades" element={<Grades /> }></Route>
          <Route path="assignments" element={<Assignments />}></Route>
          <Route path="pocketbuddy" element={<PocketBuddy />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default MainRoutes