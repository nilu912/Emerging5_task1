import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./hooks/protectedRoutes.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useAuth } from "./context/authContext.jsx";
import { Riple } from "react-loading-indicators";
function App() {
  const { isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="h-screen w-screen backdrop-blur-md flex flex-col  gap-3 items-center justify-center">
        <div className="flex items-center justify-center flex-col">
        <Riple color="#1c398e" size="large" text="" textColor="" />
        <p className="text-blue-800  text-lg">Loading...</p>
        </div>
      </div>
    );
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
