import { httpRequest, postConfig, getError, getConfig } from "../../utils/requestUtils";

export const ME_SUCCESS = "ME_SUCCESS";
export const LOG_OUT = "LOG_OUT";

export const login = (payload) => (dispatch) => {
  return httpRequest
    .post("/login", payload, postConfig)
    .then(async (res) => {
      let token = res.data.Token;
      await localStorage.setItem("token", token);
      return dispatch(getMe(token));
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getMe = (token) => (dispatch) => {
  return httpRequest
    .get("/user/me", getConfig(token))
    .then((res) => {
      dispatch({
        type: ME_SUCCESS,
        payload: { Token: token, ...res.data },
      });

      return Promise.resolve(res.data);
    })
    .catch((err) => {
      dispatch(logout());
      return Promise.reject(err);
    });
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");

  dispatch({
    type: LOG_OUT,
  });
};
