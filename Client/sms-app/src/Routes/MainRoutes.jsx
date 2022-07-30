import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../Components/Dashboard";
import InstructorDashboard from "../Components/InstructorDashboard";
import Home from "../Components/Home";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import Assignments from "../Components/subcomponents/Assignments";
import InstructorAssignments from "../Components/subcomponents/InstructorAssignments";
import Grades from "../Components/subcomponents/Grades";
import PocketBuddy from "../Components/subcomponents/PocketBuddy";
import TalkToExpert from "../Components/subcomponents/TalkToExpert";

import { RequireStudentAuth } from "./RequireStudentAuth";
import { RequireInstructorAuth } from "./RequireInstructorAuth";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/dashboard/*"
          element={
            <RequireStudentAuth>
              <Dashboard />
            </RequireStudentAuth>
          }
        >
          <Route path="grades" element={<Grades />}></Route>
          <Route path="assignments" element={<Assignments />}></Route>
          <Route path="pocketbuddy" element={<PocketBuddy />}></Route>
          <Route path="talkToExpert" element={<TalkToExpert />}></Route>
        </Route>
        <Route
          path="/instructordashboard/*"
          element={
            <RequireInstructorAuth>
              <InstructorDashboard />
            </RequireInstructorAuth>
          }
        >
          <Route
            path="postassignments"
            element={<InstructorAssignments />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
