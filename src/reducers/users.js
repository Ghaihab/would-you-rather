import { RECEIVE_USERS } from "../actions/users";

let _users = {};

if(localStorage.getItem('store')){
    _users = JSON.parse(localStorage.getItem('store')).users;
}

export default function users(state = _users, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        default:
            return state;
    }
}
