import axios from "axios";
import * as ActionTypes from "./ActionTypes";
import toast from "react-hot-toast";

export const createQuestionnaireStart = () => {
    return {
        type: ActionTypes.CREATE_QUESTIONNAIRE_START
    }
}

export const createQuestionnaireSuccess = (data) => {
    return {
        type: ActionTypes.CREATE_QUESTIONNAIRE_SUCCESS,
        payload: data
    }
}

export const createQuestionnaireFail = (error) => {
    return {
        type: ActionTypes.CREATE_QUESTIONNAIRE_FAIL,
        payload: error
    }
}


export const createQuestionnaire = (formData) => async (dispatch) => {
    try {
        dispatch(createQuestionnaireStart());
        const response = await axios.post('http://localhost:3000/questionnaires', formData);
        dispatch(createQuestionnaireSuccess(response.data));
        toast.success("Created Successfully", {position: "top-right"})
    } catch (error) {
        console.log(error);
        dispatch(createQuestionnaireFail(error.message));
    }
}