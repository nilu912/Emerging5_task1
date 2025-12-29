import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./hooks/protectedRoutes.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
      {/* <ProtectedRoutes>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </ProtectedRoutes> */}
    </>
  );
}

export default App;
