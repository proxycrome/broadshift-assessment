import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { fetchQuestionnaire } from "../store/Actions/fetchAction";
import * as Actions from "../store/Actions/PostAnswersAction"
import { Toaster } from "react-hot-toast";

const Questionnaire = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = location.pathname.split('/')[2]
    const { questionnaires } = useSelector(state => state.fetchQuestions)
    const filteredQuestionaires = questionnaires?.filter(questionnaire => questionnaire.step === id)
    let stepNumbers = questionnaires?.filter(questionnaire => questionnaire.step === id)[0].stepNumbers
    const questions = questionnaires?.map(question => question.question)
    let questionObj = {};
    questions?.forEach(question => {
        Object.assign(questionObj,{[question]: ""})
    })
    const [formData, setFormData] = useState(questionObj);
    const [checked, setChecked] = useState([]);

    const handleCheck = (e) => {
        const value = e.target.value;
        setChecked((prev) =>
            checked.includes(value)
            ? prev.filter((cur) => cur !== value)
            : [...prev, e.target.value]
        );
    };
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(e.target.checked && e.target.type === "checkbox"){
            setFormData({
                ...formData,
                [name]: checked
            })
        }else{
            setFormData({
                ...formData,
                [name]: value
            })
        }
        

    }

    useEffect(() => {
        const fetchQuestions = () => {
            dispatch(fetchQuestionnaire())
        }
        fetchQuestions()
    }, [dispatch])

    const handlePrev = () => {
        navigate(`/questionnaire/${+id - 1}`) 
    }

    const handleNext = () => {
        navigate(`/questionnaire/${+id + 1}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Actions.postAnswer(formData))

        setFormData(questionObj)
    }

  return (
    <div className="container">
        <Toaster />
        <h1>Step {id}</h1>
        <form onSubmit={handleSubmit}>
            {filteredQuestionaires?.map(question => (
                <div className="form-group mb-3" key={question.id}>
                    <span>{question.questionNumber}.{" "}</span><label>{question.question}</label>
                    {question.inputType === "radio" && question.options.map((option, i) => (
                        <div key={i}>
                            <label >
                                <input 
                                    type={question.inputType} 
                                    name={question.question} 
                                    value={option}
                                    checked={formData[question.question] === option}
                                    onChange={handleChange} 
                                />{" "}{option}
                            </label>
                        </div>
                    ))}
                    
                    {question.inputType === "checkbox" && question.options.map((option, i) => (
                        <div key={i}>
                            <label>
                                <input 
                                    id={i}
                                    type={question.inputType} 
                                    name={question.question} 
                                    value={option} 
                                    onChange={(e) => {handleCheck(e);handleChange(e);}} 
                                />{" "}{option}
                            </label>
                        </div>
                    ))}
                    {question.inputType === "text" && (
                        <div>
                            <input 
                                type={question.inputType} 
                                name={question.question} 
                                value={formData[question.question]} 
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className="my-4 d-flex gap-3">
                {id !== "1" && (
                    <button 
                        type="button" 
                        className="btn btn-sm btn-info" 
                        onClick={handlePrev}
                    >
                        Prev
                    </button>
                )}
                {id !== stepNumbers && (
                    <button 
                        type="button" 
                        className="btn btn-sm btn-primary" 
                        onClick={handleNext}
                    >
                        Next
                    </button>
                )}
            </div>
            {id === stepNumbers && (
                <div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            )}
            
        </form>
    </div>
  )
}

export default Questionnaire
