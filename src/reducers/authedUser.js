import { LOGIN_USER, LOGOUT_USER } from "../actions/authedUser";

let _authedUser = null;

if(localStorage.getItem('store')){
    let _store = JSON.parse(localStorage.getItem('store'));
    _authedUser  = _store.authedUser;
}

export default function authedUser(state = _authedUser, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                ...action.authedUser
            }
        case LOGOUT_USER:
            localStorage.clear();
            return null;
        default:
            return state;
    }
}
