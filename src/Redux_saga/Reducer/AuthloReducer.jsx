

import { otpSent } from "../Actions/Authlogin_Action";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, OTP_SENT, OTP_VERIFY_REQUEST } from "../Types/LoginForm_Types";


const initialState={
    loading: false,
    user : [] ,
    error: null,
    otpSent: false,
    otpMessage: null,
};

  const AuthloReducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{...state, loading:true, error: null };
        case LOGIN_SUCCESS:
            return{...state, loading:false, user:action.payload, error: null};
        case LOGIN_FAILURE:
            return { ...state, loading: false, user: null, error: action.payload };

            //OTP FLOW
            case OTP_SENT:
                return{ ...state, otpSent: true};

            case OTP_VERIFY_REQUEST:
                return{ ...state, loading: true, error: null, otpMessage: null};    
        default:
            return state;
    }
  };

  export default AuthloReducer;