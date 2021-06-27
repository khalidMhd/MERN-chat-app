const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
        USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, 
        USER_LOGOUT, } = require("../constants/auth");

function signinReducer(state = {},action){
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true}
        case USER_SIGNIN_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default: return state;
        }
}



function signupReducer(state={}, action){
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {loading: true}
        case USER_SIGNUP_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_SIGNUP_FAIL:
            return {loading:false, error:action.payload}
        default: return state
    }
}

export {signinReducer,signupReducer, }