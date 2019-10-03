import {_saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const GET_UNANSWERED_QUESTIONS = 'GET_UNANSWERED_QUESTIONS';
export const GET_ANSWERED_QUESTIONS = 'GET_ANSWERED_QUESTIONS';
export const VOTE = 'VOTE';

export const SAVE_QUESTION = 'SAVE_QUESTION';


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        all: questions,
    }
}


export function getAnsweredQuestions(authedUser, questions) {

    let answeredQuestions = {};

    Object.keys(questions).forEach((question_id) => {
        if(authedUser.answers[question_id] !== undefined){
            answeredQuestions[question_id] = questions[question_id]
        }
    });

    return {
        type: GET_ANSWERED_QUESTIONS,
        answered_questions: answeredQuestions
    }
}

export function getUnAnsweredQuestions(authedUser, questions) {

    let unAnsweredQuestions = {};

    Object.keys(questions).forEach((question_id) => {
        if(authedUser.answers[question_id] === undefined){
            unAnsweredQuestions[question_id] = questions[question_id]
        }
    });

    return {
        type: GET_UNANSWERED_QUESTIONS,
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


