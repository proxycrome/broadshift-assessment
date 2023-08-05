import { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuestionnaire } from "../store/Actions/createAction";
import { Toaster } from "react-hot-toast";

const CreateQuestionnaire = () => {
  // const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0);
  const details = {
    stepNumbers: "",
    step: "",
    inputType: "",
    questionNumber: "",
    question: "",
    options: []
  }
  const [formData, setFormData] = useState(details)

  const dispatch = useDispatch();


  const handleChange = (e) => {
    const {name, value} = e.target;

    if(name === "options"){
      const optionArr = [...formData.options]
      optionArr[e.target.id] = value;
      setFormData({
        ...formData,
        [name]: optionArr
      })
    }else{
      setFormData({
        ...formData,
        [name]: value
      })
    }  
  }


  const handleClick = () => {
    setCounter(counter + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: new Date().getTime().toString(),
      ...formData
    }

    dispatch(createQuestionnaire(data))

    setFormData(details);
    setCounter(0);
  }


  return (
    <div className="container">
      <Toaster />
      <h1>Create Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="stepNumbers">Number of Steps</label>
          <input 
            type="number" 
            className="form-control"
            placeholder="How many numbers of Steps"
            id="stepNumbers" 
            name="stepNumbers" 
            value={formData.stepNumbers} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="step">Current Step</label>
          <input 
            type="number" 
            className="form-control"
            placeholder="Enter the Question Step"
            id="step" 
            name="step" 
            value={formData.step} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="noOfQuestions">Question Number</label>
          <input 
            type="number" 
            className="form-control"
            placeholder="Enter the No of Questions for this step"
            id="questionNumber" 
            name="questionNumber" 
            value={formData.questionNumber} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputType">Question Input field type</label>
          <select 
            id="inputType" 
            className="form-control" 
            name="inputType" 
            value={formData.inputType} 
            onChange={handleChange}
          >
            <option value="">Select an input Type</option>
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>
        {formData.inputType === "text" && (
          <div className="form-group mb-3">
            <label htmlFor="question">Question</label>
            <input 
              type="text" 
              className="form-control"
              name="question" 
              value={formData.question} 
              onChange={handleChange}/>
          </div>
        )}
        {(formData.inputType === "radio" || formData.inputType === "checkbox") && (
          <div>
            <div className="form-group mb-3" >
              <label htmlFor="question">Question</label>
              <input 
                type="text" 
                className="form-control"
                name="question" 
                value={formData.question} 
                onChange={handleChange}
              />
            </div>
            {Array.from(Array(counter)).map((c, index) => (
              <div className="form-group mb-2" key={index}>
                <label htmlFor={`option${index+1}`}>Option</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id={index} 
                  name="options" 
                  value={formData.options[index]} 
                  onInput={handleChange}
                />
              </div>
            ))}
            <button 
              type="button" 
              className="btn btn-sm btn-success mb-3" 
              onClick={handleClick}
            >
              Add Options
            </button>
          </div>  
        )}
        <button type="submit" className="btn btn-primary">Create Questionnaire</button>
      </form>
    </div>
  )
}

export default CreateQuestionnaire

