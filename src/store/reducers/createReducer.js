import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {
    loading: false,
    questionnaire: null,
    error: null
}

const createReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.CREATE_QUESTIONNAIRE_START:
            return {
                ...state,
                loading: true,
            }

        case ActionTypes.CREATE_QUESTIONNAIRE_SUCCESS:
            return {
                ...state,
                loading: false,
                questionnaire: action.payload,
                error: null
            }

        case ActionTypes.CREATE_QUESTIONNAIRE_FAIL:
            return {
                ...state,
                loading: false,
                questionnaire: null,
                error: action.payload, 
            }

        default:
            return state;
    }
}

export default createReducer;