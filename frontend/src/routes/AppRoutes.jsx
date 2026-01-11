import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/Projects";
import ProjectS from "../pages/projects/Projects";
import TestCases from "../pages/testcases/TestCases";
import TestSuites from "../pages/testsuites/TestSuites";
import Executions from "../pages/executions/Executions";
import ExecutionDetail from "../pages/executions/ExecutionDetail";
import Users from "../pages/users/Users";
import CreateTestCase from "../pages/testcases/CreateTestCase";
import EditTestCase from "../pages/testcases/EditTestCase";

import PrivateRoute from "./PrivateRoute";
import MainLayout from "../components/layout/MainLayout";
import ProjectSelector from "../pages/projects/ProjectSelector";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/projects"
        element={<PrivateRoute><MainLayout><Projects /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/projects/select"
        element={<PrivateRoute><MainLayout><ProjectSelector /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/testcases"
        element={<PrivateRoute><MainLayout><TestCases /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/testcases/new"
        element={<PrivateRoute><MainLayout><CreateTestCase /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/testcases/:id/edit"
        element={<PrivateRoute><MainLayout><EditTestCase /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/testsuites"
        element={<PrivateRoute><MainLayout><TestSuites /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/executions"
        element={<PrivateRoute><MainLayout><Executions /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/executions/:id"
        element={<PrivateRoute><MainLayout><ExecutionDetail /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/users"
        element={<PrivateRoute><MainLayout><Users /></MainLayout></PrivateRoute>}
      />
    </Routes>
  );
}
