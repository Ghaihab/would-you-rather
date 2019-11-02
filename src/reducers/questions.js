import {
    RECEIVE_QUESTIONS,
    VOTE, SAVE_QUESTION
} from "../actions/questions";

let _questions = {};

if(localStorage.getItem('store')){
    _questions = JSON.parse(localStorage.getItem('store')).questions;
}

export default function questions(state = _questions, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                all: action.all,
                answered_questions: action.answered_questions,
                unanswered_questions: action.unanswered_questions
            }
        case SAVE_QUESTION:

            let all = {};
            Object.keys(state.all).map((question_id) => {
                all[question_id] = state.all[question_id];
            });
            all[action.question.id] = action.question;

            let unanswered_questions = {};
            Object.keys(state.unanswered_questions).map((question_id) => {
                unanswered_questions[question_id] = state.all[question_id];
            });
            unanswered_questions[action.question.id] = action.question;

            return {
                ...state,
                all,
                unanswered_questions
            }
        case VOTE:
            let allQuestions = {}

            Object.keys(state.all).map((question_id) => {
                allQuestions[question_id] = state.all[question_id];
            });
            allQuestions[action.question.id] = action.question;

            return {
               ...state,
                all: allQuestions
            }
        default:
            return state;
    }
}
