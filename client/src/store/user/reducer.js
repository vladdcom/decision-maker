import { USER } from "./types";

const initialState = {
  auth: false,
  userData: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.SIGN_IN:
      return {
        ...state,
        auth: true,
        userData: action.payload
      };
    case USER.SIGN_OUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default userReducer;
