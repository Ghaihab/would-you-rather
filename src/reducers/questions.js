import {
    RECEIVE_QUESTIONS,
    GET_ANSWERED_QUESTIONS,
    GET_UNANSWERED_QUESTIONS,
    VOTE, SAVE_QUESTION
} from "../actions/questions";


export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                all: action.all
            }

        case GET_ANSWERED_QUESTIONS:
            return {
                ...state,
                answered_questions: action.answered_questions
            }

        case GET_UNANSWERED_QUESTIONS:
            return {
                ...state,
                unanswered_questions: action.unanswered_questions
            }
        case SAVE_QUESTION:
            state['all'][action.question.id] = action.question;
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
