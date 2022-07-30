import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import InstructorDashboard from "../components/InstructorDashboard";
import Home from "../components/Home";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Assignments from "../components/subcomponents/Assignments";
import InstructorAssignments from "../components/subcomponents/InstructorAssignments";
import Grades from "../components/subcomponents/Grades";
import PocketBuddy from "../components/subcomponents/PocketBuddy";
import TalkToExpert from "../components/subcomponents/TalkToExpert";
import TalkToStudent from "../components/subcomponents/TalkToStudent";

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
          <Route path="talkToStudent" element={<TalkToStudent />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
