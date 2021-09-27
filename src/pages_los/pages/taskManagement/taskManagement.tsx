import { Routes, Route } from "react-router-dom";
import { ColdCalling } from "./coldCalling";
import { Worklog } from "./worklog";
import { AssignedTask, MyTask } from "./task";

export const TaskManagement = () => (
  <Routes>
    <Route path="myTask/*" element={<MyTask />} />
    <Route path="assigned/*" element={<AssignedTask />} />
    <Route path="worklog" element={<Worklog />} />
    <Route path="coldCalling/*" element={<ColdCalling />} />
  </Routes>
);
