import { DELETE_USERS, GET_USERS, GET_USERS_SUCCESS, FAVORITE_USERS, EDIT_USERS } from "./actions";
import initialState from "./state";
import route from './route';
const Edituser = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        users: action.users
      });
    case DELETE_USERS:
      return Object.assign({}, state, {
        isLoading: true,
        users: action.users
      });
    case EDIT_USERS:
      return state.map((user) => {
        if (user.id === action.user) {
          return {
            ...user,
            ...action.users
          };
        } else {
          return user;
        }
      });
    case FAVORITE_USERS:
      return Object.assign({}, state, {
        isLoading: true,
        users: action.users
      });
    default:
      return state;
  }
};

export default reducer;