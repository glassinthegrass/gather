import axios from "axios";

const initialState = {
  user: {
    isLoggedIn:false
  },
};
const LOGIN_USER = "LOGIN_USER";
const REGISTER_USER = "REGISTER_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";

export const getUser = () => {
  let user = axios.get('/auth/user').then(res=>res.data).catch(err=>console.log(err))
  console.log(user)
  return {
    type: GET_USER,
    payload: user
  };
};
export const loginUser = (email, password) => {
  let login = axios
    .post("/auth/login", { email, password })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: LOGIN_USER,
    payload: login,
  };
};

export const registerUser = (first_name, last_name, email, password) => {
  let register = axios
    .post("/auth/register", { first_name, last_name, email, password })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: LOGIN_USER,
    payload: register,
  };
};

export const logoutUser = () => {
  const logout = axios
    .delete("/auth/logout")
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: LOGOUT_USER,
    payload: logout,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER + "_PENDING":
      return{
        ...state
      };
    case GET_USER + "_FULFILLED":
      return{
        ...state,
        user:action.payload
      };
    case LOGOUT_USER + "_PENDING":
      return {
        ...state
      };
    case LOGOUT_USER + "_FULFILLED":
      return {
        ...initialState
      };

    case LOGIN_USER + "_PENDING":
      return {
        ...state,
      };
    case LOGIN_USER + "_FULFILLED":
      if (!action.payload) {
        return {
          ...state,
          user: {},
        };
      }
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_USER + "_PENDING":
      return {
        ...state,
      };
    case REGISTER_USER + "_FULFILLED":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
