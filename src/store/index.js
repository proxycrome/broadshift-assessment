import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers/createReducer';
import fetchReducer from './reducers/fetchReducer';
import answersReducer from './reducers/answersReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    createQuestion: createReducer,
    fetchQuestions: fetchReducer,
    answers: answersReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;