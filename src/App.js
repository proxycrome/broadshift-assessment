import { Routes, Route, Navigate} from 'react-router-dom'
import CreateQuestionnaire from './pages/createQuestionnaire';
import Questionnaires from './pages/questionnaires';
import Questionnaire from './pages/questionnaire';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/create-questionnaire"  element={<CreateQuestionnaire />}/>
        <Route path="/questionnaire/:id"  element={<Questionnaire />}/>
        <Route path="/questionnaires"  element={<Questionnaires />}/> 
        <Route path="/" element={<Navigate to="/create-questionnaire" replace />} /> 
      </Routes>
    </div>
  );
}

export default App;
