import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{
    otpVerifyRequest,
    otpResendRequest,
}from "../Redux_saga/Actions/Authlogin_Action";
// import "bootstrap/dist/css/bootstrap.min.css";



// const OtpModal = () => {
//     const [otp,setOtp] = useState("");
//     const dispatch = useDispatch();
//     const {loading, error, otpMessage, user } = useSelector((state)=>state.auth);

//     const handleVerify = () =>{dispatch(otpVerifyRequest({userId:user?.id, otp}));
//    };

//     const handleResend = () => { dispatch(otpResendRequest(user?.id));
//   };


//   return (
//     <div className="modal show d-block" tabIndex="-1">
//         <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content p-4">
//                 <h5 className="modal-title text-center mb-3">OTP Verification</h5>

//                 <input type="text" className="form-control mb-3"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}/>

//               <button className="btn btn-success w-100 mb-2"
//                  onClick={handleVerify}
//                  disabled={loading}>
//                     {loading? "Verifying..." : "Verify OTP"}
//               </button>

//               <button  className="btn btn-link w-100" onClick={handleResend} disabled={loading}>
//                 Resend OTP
//               </button>

//               {otpMessage &&(
//                 <p className="text-success text-center mt-2">{otpMessage}</p>
//               )}
//               {error && <p className="text-danger text-center mt-2">{error}</p>}
//             </div>
//         </div>
      
//     </div>
//   );
// }

    function OtpModal({ onClose }) {
  const dispatch = useDispatch();
  const { user, otpMessage, error } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [disabled, setDisabled] = useState(true);
  const [prefix, setPrefix] = useState("");

  // Generate random letters
  const generatePrefix = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let text = "";
    for (let i = 0; i < 4; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPrefix(text);
  };

     const [demoOtp, setDemoOtp] = useState("");

useEffect(() => {
  const randomOtp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  setDemoOtp(randomOtp);
}, [otpMessage]);


  // Reset timer & prefix when modal loads or resend happens
  useEffect(() => {
    generatePrefix();
    setDisabled(true);
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setDisabled(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpMessage]);

  const handleVerify = () => {
    if (!otp) {
      alert("Please enter OTP!");
      return;
    }
    dispatch(otpVerifyRequest({ userid: user?.id, otp }));
  };

  const handleResend = () => {
    dispatch(otpResendRequest(user?.id));
    alert("OTP Resent Successfully!");
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
                <strong>Your OTP: </strong> {user?.data?.otp || demoOtp || "Not received"}
             </div>

            {/* Prefix + OTP input */}
            <div className="input-group mb-3 justify-content-center">
              <span className="input-group-text fw-bold">{prefix}</span>
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
                {timer > 0 ? `00:${timer.toString().padStart(2, "0")}` : ""}
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



