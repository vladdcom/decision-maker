import axios from "axios";
import { USER } from "./types";

export const userSignIn = userData => ({
  type: USER.SIGN_IN,
  payload: userData
});

export const userSignOut = () => ({
  type: USER.SIGN_OUT
});

export const tryAuthenticate = () => dispatch => {
  return axios
    .get("http://localhost:5000/api/auth/try", {
      withCredentials: true
    })
    .then(() =>
      axios
        .get("http://localhost:5000/api/userInfo", {
          withCredentials: true
        })
        .then(response => dispatch(userSignIn(response.data)))
    )
    .catch(() => dispatch(userSignOut()));
};

export const signOut = () => dispatch => {
  return axios
    .get("http://localhost:5000/api/auth/out", {
      withCredentials: true
    })
    .then(() => {
      dispatch(userSignOut());
    });
};
