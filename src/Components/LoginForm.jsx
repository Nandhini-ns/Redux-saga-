import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import { loginRequest,closeOtpModal } from "../Redux_saga/Actions/Authlogin_Action";
import OtpModal from "./OtpModal";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, user, error, otpSent } = useSelector((state) => state.auth);

  // Save token to localStorage when login succeeds
 useEffect(() => {
  if (user?.token) {
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
  }
}, [user]);


  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else setUsernameError("");

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else setPasswordError("");

    if (!isValid) return;

    dispatch(loginRequest({ userName: username, password }));

    setUsername("");
    setPassword("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className={`form-control ${usernameError ? "is-invalid" : ""}`}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (e.target.value.trim()) setUsernameError("");
                }}
              />
            </div>
            {usernameError && <div className="text-danger mt-1">{usernameError}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.trim()) setPasswordError("");
                }}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
              </span>
            </div>
            {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error */}
          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </div>

      {/* OTP Modal */}
      {otpSent && <OtpModal onClose={() => dispatch(closeOtpModal())} />}
    </div>
  );
}

export default LoginForm;


