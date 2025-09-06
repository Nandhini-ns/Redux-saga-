import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{
    otpVerifyRequest,
    otpResendRequest,
}from "../Redux_saga/Actions/Authlogin_Action";



const OtpModal = () => {
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const {loading, error, otpMessage, user } = useSelector((state)=>state.auth);

    const handleVerify = () =>{dispatch(otpVerifyRequest({userId:user?.id, otp}));
   };

    const handleResend = () => { dispatch(otpResendRequest(user?.id));
  };


  return (
    <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
                <h5 className="modal-title text-center mb-3">OTP Verification</h5>

                <input type="text" className="form-control mb-3"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}/>

              <button className="btn btn-success w-100 mb-2"
                 onClick={handleVerify}
                 disabled={loading}>
                    {loading? "Verifying..." : "Verify OTP"}
              </button>

              <button  className="btn btn-link w-100" onClick={handleResend} disabled={loading}>
                Resend OTP
              </button>

              {otpMessage &&(
                <p className="text-success text-center mt-2">{otpMessage}</p>
              )}
              {error && <p className="text-danger text-center mt-2">{error}</p>}
            </div>
        </div>
      
    </div>
  );
}

export default OtpModal;



