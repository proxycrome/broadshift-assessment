import * as ActionTypes from "../Actions/ActionTypes";

const initialState = {
    loading: false,
    msg: null,
    error: null
} 

const answersReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.POST_ANSWERS_START:
            return {
                ...state,
                loading: true
            }

        case ActionTypes.POST_ANSWERS_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: "Successfully Sent",
                error: null
            }
        
        case ActionTypes.POST_ANSWERS_FAIL:
            return {
                ...state,
                loading: false,
                msg: null,
                error: action.payload
            }

        default:
            return state;
    }
}

export default answersReducer;