import axios from "axios";
import BASE_URL from "../Redux_saga/BaseUrl/BaseUrl";

export const loginApi =(Credentials)=>
     axios.post(`${BASE_URL}/auth/login`,Credentials);

export const verifyOtpApi =(otpData) =>
    axios.post (`${BASE_URL}/auth/verify-otp`,otpData);

export const resendOtpApi =(userId) =>
    axios.post(`${BASE_URL}/auth/resend-otp`,{userId } );


