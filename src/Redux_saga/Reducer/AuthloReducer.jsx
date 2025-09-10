
import { CLOSE_OTP_MODAL, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, OTP_RESEND_FAILURE, OTP_RESEND_REQUEST, OTP_RESEND_SUCCESS, OTP_SENT, OTP_VERIFY_FAILURE, OTP_VERIFY_REQUEST, OTP_VERIFY_SUCCESS } from "../Types/LoginForm_Types";


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
                
            case OTP_VERIFY_SUCCESS:
                return{...state, loading: false, otpVerified: true, otpMessage: action.payload,};

            case OTP_VERIFY_FAILURE:
                return{...state, loading: false, error: action.payload};

            case OTP_RESEND_REQUEST:
                return{...state, loading: true, error:null, otpMessage:null};

            case OTP_RESEND_SUCCESS:
                return{...state, loading:false, otpMessage: action.payload};

            case OTP_RESEND_FAILURE:
                return{...state, loading:false, error:action.payload};

            case CLOSE_OTP_MODAL:
                return{...state, otpSent:false};

        default:
            return state;
    }
  };

  export default AuthloReducer;