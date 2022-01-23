import { ME_SUCCESS, LOG_OUT } from "../actions/authActions";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ME_SUCCESS":
      return {
        ...state,
        user: {
          ...action.payload,
        },
        isAuthenticated: true,
      };

    case "LOG_OUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
