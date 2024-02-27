import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HeaderAndSidebar from "../components/HeaderAndSideBar";
import { MDBInput } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { useUpdateTrainStationMutation } from "../service/authApi";

const initialState = {
  trainId: "",
  station: "",
};

const updateTrainStation = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { station, trainId } = formValue;
  const dispatch = useAppDispatch();

  const handleCreateCoach = () => {
    toast.success("Created Coach and Added to the train");
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setFormValue({
      ...formValue,

      [e.target.name]: e.target.value,
    });
    console.log(formValue);
    e.preventDefault();
  };

  const [
    createTrain,
    {
      data: LoginData,
      error: LoginError,
      isError: isLoginError,
      isSuccess: isLoginSuccess,
    },
  ] = useUpdateTrainStationMutation();

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className=" col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2">Update Station</h2>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      name="station"
                      label="station"
                      type="text"
                      value={station}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      name="trainId"
                      label="TrainID"
                      type="text"
                      value={trainId}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                    />
                  </div>
                  <button
                    className="btn btn-outline-light btn-lg px-5 mt-3"
                    type="button"
                    onClick={() => handleCreateCoach}>
                    Update Station
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default updateTrainStation;
