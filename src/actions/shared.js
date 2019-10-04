import { _getUsers, _getQuestions } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions} from "./questions";
import { showLoading, hideLoading } from "react-redux-loading";


export function handleInitialData(authedUser){
    return (dispatch)  => {
        dispatch(showLoading());
        return Promise.all([
            _getUsers(),
            _getQuestions()
        ]).then(([users, questions]) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(authedUser, questions));
            dispatch(hideLoading());
        });
    }
}

export function handleGetUsers() {
    return (dispatch)  => {
        dispatch(showLoading());
        return _getUsers().then((users) => {
            dispatch(receiveUsers(users));
            dispatch(hideLoading());
        });
    }
}

export function handleGetQuestions(authedUser) {
    return (dispatch)  => {
        dispatch(showLoading());
        return _getQuestions().then((questions) => {
            dispatch(receiveQuestions(authedUser, questions));
            dispatch(hideLoading());
        });
    }
}
