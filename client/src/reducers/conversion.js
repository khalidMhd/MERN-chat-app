import { CONVERSATION_SET_FAIL, CONVERSATION_SET_REQUEST, CONVERSATION_SET_SUCCESS, CONVERSION_LIST_FAIL, CONVERSION_LIST_REQUEST, CONVERSION_LIST_SUCCESS } from "../constants/conversion"

function getConversationReducer(state={listConversion: []}, action){
    switch(action.type){
        case CONVERSION_LIST_REQUEST:
            return {loading: true}
        case CONVERSION_LIST_SUCCESS:
            return {loading:false, listConversion:action.payload}
        case CONVERSION_LIST_FAIL:
            return {loading:false, error:action.payload}
        default: return state
    }
}

function setConversationReducer(state={listConversion: []}, action){
    switch(action.type){
        case CONVERSATION_SET_REQUEST:
            return {loading: true}
        case CONVERSATION_SET_SUCCESS:
            return {loading:false, listConversion:action.payload}
        case CONVERSATION_SET_FAIL:
            return {loading:false, error:action.payload}
        default: return state
    }
}


export {getConversationReducer, setConversationReducer}