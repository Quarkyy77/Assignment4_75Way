import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../service/authApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/hooks";
import { setUser } from "../features/authSlice";

const initialState = {
  Name: "",
  location: "",
  email: "",
  password: "",
  role: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { Name, email, password, confirmPassword, role } = formValue;
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useAppDispatch();

  const [
    loginUser,
    {
      data: LoginData,
      error: LoginError,
      isError: isLoginError,
      isSuccess: isLoginSuccess,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: RegisterData,
      error: RegisterError,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
    },
  ] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setFormValue({
      ...formValue,

      [e.target.name]: e.target.value,
      role: e.target.value,
    });
    console.log(formValue);
    e.preventDefault();
  };
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (Name && email && password && role) {
      console.log(Name, email, password, role);
      await registerUser({ Name, email, password, role });
    }
  };

  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else toast.error("Please Enter Email and Password");
  };
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Login Successful");
      dispatch(
        setUser({
          name: LoginData.user.Name,
          userAuthToken: LoginData.userAuthToken,
          userRefreshToken: LoginData.userRefreshToken,
        })
      );
      navigate("/dashboard");
    }
    if (isRegisterSuccess) {
      toast.success("Successfull regstered user");
      navigate("/dashboard");
    }
  }, [isLoginSuccess, isRegisterSuccess]);

  useEffect(() => {
    if (isLoginError) {
      toast.error((LoginError as any).data.message);
    }

    if (isRegisterError) {
      toast.error((RegisterError as any).data.message);
    }
  }, [isLoginError, isRegisterError]);
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
                  <h2 className="fw-bold mb-2 text-uppercase">
                    {!showRegister ? "Login" : "Register"}
                  </h2>
                  <p className="text-white-50 mb-4">
                    {!showRegister
                      ? "Please Enter Email and Password"
                      : "Please Enter User Details"}
                  </p>
                  {showRegister && (
                    <>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          name="Name"
                          label="Please Enter your Name"
                          type="text"
                          value={Name}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                      </div>
                    </>
                  )}

                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      name="email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      name="password"
                      label="Enter Password"
                      type="password"
                      value={password}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                    />
                  </div>
                  {showRegister && (
                    <div className="form-outline form-white mb-4">
                      <MDBInput
                        name="confirmPassword"
                        label="Re-enter the  Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                    </div>
                  )}
                  {showRegister && (
                    <div className="form-outline form-white mb-4">
                      <select
                        className="form form-control-lg"
                        onChange={handleChange}>
                        <option selected>Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </div>
                  )}
                  {!showRegister ? (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={() => handleLogin()}>
                      Login
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={() => handleRegister()}>
                      Register
                    </button>
                  )}
                </div>

                <div>
                  <h5 className="mb-0">
                    {!showRegister ? (
                      <>
                        Don't have an account?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowRegister(true)}>
                          Sign Up here
                        </p>
                      </>
                    ) : (
                      <>
                        Already have an account?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowRegister(false)}>
                          Sign In here
                        </p>
                      </>
                    )}

                    {!showRegister && (
                      <>
                        Forgot Password?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate("/updatePassword");
                          }}>
                          <u>Reset Password</u>
                        </p>
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
