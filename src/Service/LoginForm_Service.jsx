import axios from "axios";
import BASE_URL from "../Redux_saga/BaseUrl/BaseUrl";

export const loginApi =(Credentials)=>
     axios.post(`${BASE_URL}/app/auth/login`,Credentials);


export const verifyOtpApi = (payload, jwtToken) => {
  return axios.post(
    `${BASE_URL}/app/auth/access-code/validate`,
    payload,  // now comes from function parameter
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `BslogiKey ${jwtToken}`, // now comes from function parameter
      },
    }
  );
};

 

export const resendOtpApi = (payload, jwtToken) => {
  return axios.post(
    `${BASE_URL}/app/auth/access-code/resend`,  // correct endpoint
    payload,  // { opaque }
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `BslogiKey ${jwtToken}`  // pass JWT token
      }
    }
  );
};


