import {_saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const GET_UNANSWERED_QUESTIONS = 'GET_UNANSWERED_QUESTIONS';
export const GET_ANSWERED_QUESTIONS = 'GET_ANSWERED_QUESTIONS';
export const VOTE = 'VOTE';

export const SAVE_QUESTION = 'SAVE_QUESTION';


export function receiveQuestions(authedUser, questions) {
    let answeredQuestions = {};
    let unAnsweredQuestions = {};

    if(authedUser){
        Object.values(questions)
            .forEach((question) => {
            if(authedUser.answers[question.id] !== undefined){
                answeredQuestions[question.id] = question;
            }
        });

        Object.values(questions)
            .forEach((question) => {
            if(authedUser.answers[question.id] === undefined){
                unAnsweredQuestions[question.id] = question;
            }
        });
    }

    return {
        type: RECEIVE_QUESTIONS,
        all: questions,
        answered_questions: answeredQuestions,
        unanswered_questions: unAnsweredQuestions
    }
}

function vote(authedUser, question, answer) {
    authedUser.answers[question.id] = answer;

    if (answer === 'optionOne'){
        question.optionOne.votes.push(authedUser.id);
    }
    else {
        question.optionTwo.votes.push(authedUser.id);
    }

    return {
        type: VOTE,
        question
    }
}

export function handleVote(authedUser, question, answer) {
    return (dispatch) => {
        _saveQuestionAnswer({ authedUser:authedUser.id, qid: question.id, answer})
            .then((v) => {
                dispatch(vote(authedUser, question, answer))
            }).catch((err) => {
                console.log(err);
        });
    }
}

function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        _saveQuestion({ optionOneText, optionTwoText, author })
            .then((question) => {
                dispatch(saveQuestion(question))
            }).catch(() => {
                console.log('error saving question');
        });
    }
}


