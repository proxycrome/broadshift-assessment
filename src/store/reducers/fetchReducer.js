import * as ActionTypes from "../Actions/ActionTypes";

const initialState = {
    loading: false,
    questionnaires: null,
    error: null
}

const fetchReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.FETCH_QUESTIONAIRES_START:
            return {
                ...state,
                loading: true,
            }

        case ActionTypes.FETCH_QUESTIONAIRES_SUCCESS:
            return {
                ...state,
                loading: false,
                questionnaires: action.payload,
                error: null
            }

        case ActionTypes.FETCH_QUESTIONAIRES_FAIL:
            return {
                ...state,
                loading: false,
                questionnaires: null,
                error: action.payload
            }

        default:
            return state;
    }
}

export default fetchReducer