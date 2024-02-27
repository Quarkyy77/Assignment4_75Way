import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/hooks";
import { selectAuth } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import HeaderAndSidebar from "../components/HeaderAndSideBar";

const Dashboard = () => {
  const { roles } = useAppSelector(selectAuth);
  const navigate = useNavigate();

  return (
    <section className="vh-100 gradient-custom">
      <HeaderAndSidebar />
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className=" col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2">Welcome {roles}</h2>
                  <br></br>
                  {roles === "Admin" && (
                    <>
                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        type="button"
                        onClick={() => navigate("/createTrain")}>
                        Add Train
                      </button>
                    </>
                  )}
                  <br></br>
                  {roles === "Admin" && (
                    <>
                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        type="button"
                        onClick={() => navigate("/createCoach")}>
                        Add and Assign Coach
                      </button>
                    </>
                  )}
                  {roles === "Admin" && (
                    <>
                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        type="button"
                        onClick={() => navigate("/viewAllTrains")}>
                        View All Trains
                      </button>
                    </>
                  )}
                  {roles === "Admin" && (
                    <>
                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        type="button"
                        onClick={() => navigate("/updateTrainStation")}>
                        Update Current station of Train
                      </button>
                    </>
                  )}
                  <br></br>
                  {roles === "User" && (
                    <>
                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        type="button"
                        onClick={() => navigate("/bookTicket")}>
                        Book Ticket
                      </button>
                    </>
                  )}
                  <br></br>
                  {roles === "User" && (
                    <>
                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        type="button"
                        onClick={() => navigate("/checkTrains")}>
                        Check Trains
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
