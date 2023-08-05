import axios from "axios";
import * as ActionTypes from "./ActionTypes";
import toast  from "react-hot-toast";

export const postAnswerStart = () => {
    return {
        type: ActionTypes.POST_ANSWERS_START
    }
}

export const postAnswerSuccess = (data) => {
    return {
        type: ActionTypes.POST_ANSWERS_SUCCESS,
        payload: data
    }
}

export const postAnswerFail = (error) => {
    return {
        type: ActionTypes.POST_ANSWERS_FAIL,
        payload: error
    }
}

export const postAnswer = (formData) => async (dispatch) => {
    try {
        dispatch(postAnswerStart())
        const response = await axios.post("http://localhost:3000/answers", formData);
        dispatch(postAnswerSuccess(response.data))
        toast.success('Sent Successfully', {position: "top-right"});
    } catch (error) {
        dispatch(postAnswerFail(error.response))
    }
}