import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, 
    USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, 
} from "../constants/user"


function allUserReducer(state={listAllUser: []}, action){
    switch(action.type){
        case ALL_USER_REQUEST:
            return {loading: true}
        case ALL_USER_SUCCESS:
            return {loading:false, listAllUser:action.payload}
        case ALL_USER_FAIL:
            return {loading:false, error:action.payload}
        default: return state
    }
}

function getUserReducer(state={userList: []}, action){
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true}
        case USER_LIST_SUCCESS:
            return {loading:false, userList:action.payload}
        case USER_LIST_FAIL:
            return {loading:false, error:action.payload}
        default: return state
    }
}





export { allUserReducer, getUserReducer}