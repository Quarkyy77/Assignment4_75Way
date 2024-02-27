import { MDBInput } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdatePasswordMutation } from "../service/authApi";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [updatePassword, { data, error, isError, isSuccess }] =
    useUpdatePasswordMutation();

  const [email, setEmail] = useState("");

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    e.preventDefault();
  };

  const handleResetPass = async () => {
    if (email) {
      updatePassword({ email });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    }
    if (isSuccess) {
      toast.success("Successfull Sent email to reset password");
      navigate("/auth");
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className=" col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}>
                <div className="card-body p-4 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <div className="form-outline form-white mb-4">
                      Enter your Email associated with the Account
                      <MDBInput
                        name="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                    </div>
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={() => handleResetPass()}>
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      );
    </div>
  );
};

export default UpdatePassword;
