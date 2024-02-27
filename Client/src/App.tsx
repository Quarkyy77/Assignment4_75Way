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
import BookTicket from "./pages/BookTicket";
import CheckTrains from "./pages/CheckTrains";
import CreateTrain from "./pages/CreateTrain";
import UpdateTrainStation from "./pages/UpdateTrainStation";
import ViewAllTrains from "./pages/ViewAllTrains";
import CreateCoach from "./pages/CreateCoach";

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
          <Route
            path="/bookTicket"
            element={
              <PrivateRoute>
                <BookTicket />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkTrains"
            element={
              <PrivateRoute>
                <CheckTrains />
              </PrivateRoute>
            }
          />
          <Route
            path="/createTrain"
            element={
              <PrivateRoute>
                <CreateTrain />
              </PrivateRoute>
            }
          />
          <Route
            path="/createCoach"
            element={
              <PrivateRoute>
                <CreateCoach />
              </PrivateRoute>
            }
          />
          <Route
            path="/updateTrainStation"
            element={
              <PrivateRoute>
                <UpdateTrainStation />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewAllTrains"
            element={
              <PrivateRoute>
                <ViewAllTrains />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
