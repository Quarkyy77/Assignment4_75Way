import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./hooks/hooks";
import { useEffect } from "react";
import { setUser } from "./features/authSlice";
import PrivateRoute from "./Layouts/PrivateRoute";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  //persisting the user
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route
            path="/api/user/resetPassword/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/api/driver/resetPassword/:token"
            element={<ResetPassword />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
