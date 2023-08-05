import axios from 'axios';
import * as ActionTypes from "./ActionTypes"

export const fetchQuestionnairesStart = () => {
    return {
        type: ActionTypes.FETCH_QUESTIONAIRES_START
    }
};

export const fetchQuestionnairesSuccess = (data) => {
    return {
        type: ActionTypes.FETCH_QUESTIONAIRES_SUCCESS,
        payload: data
    }
}

export const fetchQuestionnairesFail = (error) => {
    return {
        type: ActionTypes.FETCH_QUESTIONAIRES_FAIL,
        payload: error
    }
}


export const fetchQuestionnaire = () => async (dispatch) => {
    try {
        dispatch(fetchQuestionnairesStart());
        const response = await axios.get('http://localhost:3000/questionnaires');
        dispatch(fetchQuestionnairesSuccess(response.data));
    } catch (error) {
        dispatch(fetchQuestionnairesFail(error.message))
    }
}