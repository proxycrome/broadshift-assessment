import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionnaire } from '../store/Actions/fetchAction';

const Questionnaires = () => {
  const { questionnaires } =useSelector(state => state.fetchQuestions)
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchQuestions = () => {
        dispatch(fetchQuestionnaire())
    }
    fetchQuestions()
  }, [dispatch])

  return (
    <div className="container">
      <ul>
        {questionnaires?.map(questionnaire => (
            <li key={questionnaire.id}>
                <Link to={`/questionnaire/${questionnaire.step}`}>
                    {questionnaire.question}
                </Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Questionnaires
