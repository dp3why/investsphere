import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
    // refresh the page
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history.push("/auth");
  } catch (error) {
    console.log(error.message);
  }
};
