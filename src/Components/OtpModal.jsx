import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{
    otpVerifyRequest,
    otpResendRequest,
}from "../Redux_saga/Actions/Authlogin_Action";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// import "bootstrap/dist/css/bootstrap.min.css";
    function OtpModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, otpMessage, error } = useSelector((state) => state.auth);
  const resend = useSelector((state)=> state.auth)
  console.log(resend)

  const state = useSelector(state => state.auth)
  console.log(state)
console.log(otpMessage)

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [disabled, setDisabled] = useState(true);
 

useEffect(() => {
 
  setOtp("");
}, []);

const [opaque, setOpaque] = useState(localStorage.getItem("opaque") || "");

const [accessCode, setAccessCode] = useState(user?.data?.accessCode || "");
console.log(accessCode)

useEffect(() => {
  if (user?.data?.opaque) {
    setOpaque(user?.data?.opaque);
    console.log(setOpaque)
  }
  if (user?.data?.accessCode) {
    setAccessCode(user?.data.accessCode);
    console.log(setAccessCode)
  }
}, [user]);


 useEffect(() => {
  setDisabled(true);
  setTimer(30);

  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev === 1) {
        setDisabled(false);
        clearInterval(interval);
        setOpaque("");
        setAccessCode("");

        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [otpMessage]);

    useEffect(() => {
  if (otpMessage) { 
    toast.success(otpMessage);
    setOtp("");
    onClose();               
    navigate("/activetable"); 
  }
}, [otpMessage, navigate, onClose]);


  
const handleVerify = () => {
 
dispatch(
  otpVerifyRequest({ 
    opaque: opaque,        
    accessCode: Number(otp) // convert string input to number
  })
)


setOtp("");
};


const handleResend = () => {
  dispatch(otpResendRequest()); 
  
    setOtp(""); 
    toast.info("OTP Resent Successfully!");
   
    setDisabled(true); 
    setTimer(30);
};

  
  return (
    <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg border-0 rounded-3">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">OTP Verification</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <p className="text-muted">We have sent an OTP to your registered mobile/email</p>

<div className="alert alert-info">
  <strong>Your OTP: </strong>
  <input
    type="text"
    className="form-control d-inline-block w-auto ms-2"
    value={accessCode || ""}
    readOnly
  />
</div>

<div className="input-group mb-3 justify-content-center">
  <input
    type="text"
    className="form-control fw-bold text-center w-25"
    value={opaque}
    readOnly
  />
  <input
    type="text"
    className="form-control w-50"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
  />
</div>


            {/* Verify button */}
            <button className="btn btn-primary w-100 mb-3" onClick={handleVerify}>
              Submit
            </button>

            {/* Resend OTP with timer */}
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-success"
                onClick={handleResend}
                disabled={disabled}
              >
                Resend OTP
              </button>
              <span className="fw-semibold text-secondary">
                {timer > 0 ? `00:${timer.toString().padStart(2, "0")}` : "00:00"}
              </span>
            </div>

            {/* Messages */}
            {otpMessage && <div className="alert alert-success mt-3">{otpMessage}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
    }
export default OtpModal;






