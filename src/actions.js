export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const DELETE_USERS = "DELETE_USERS";
export const EDIT_USERS = "EDIT_USERS";
export const FAVORITE_USERS = "FAVORITE_USERS";

export const getUsers = () => {
  return {
    type: GET_USERS
  };
};

export const getUsersSuccess = users => {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
};
export const deleteUsers = users => {
  return {
    type: DELETE_USERS,
    users
  };
};
export const editUsers = users => {
  return {
    type: EDIT_USERS,
    users
  };
};
export const favoriteUsers = users => {
  return {
    type: FAVORITE_USERS,
    users
  };
};