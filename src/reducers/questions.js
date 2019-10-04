import {
    RECEIVE_QUESTIONS,
    VOTE, SAVE_QUESTION
} from "../actions/questions";


export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                all: action.all,
                answered_questions: action.answered_questions,
                unanswered_questions: action.unanswered_questions
            }
        case SAVE_QUESTION:
            state['all'][action.question.id] = action.question;
            state['unanswered_questions'][action.question.id] = action.question;
            return {
                ...state,
            }
        case VOTE:
            state['all'][action.question.id] = action.question;
            return {
               ...state,
            }
        default:
            return state;
    }
}
