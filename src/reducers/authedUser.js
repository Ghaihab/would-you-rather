import { LOGIN_USER, LOGOUT_USER } from "../actions/authedUser";


export default function authedUser(state = null, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                ...action.authedUser
            }
        case LOGOUT_USER:
            return null;
        default:
            return state;
    }
}
