import React, { useReducer, createContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { GET_TOKEN } from "../gql/mutations";
import { Alert } from "@mui/material";
import { useMutation } from "@apollo/client";

const initialState = {
  user: null,
};

export type AuthContextType = {
  user: any;
  login: (email: string, password: string) => void;
  logout: () => void;
};

// if we see token in local storage, we want that token to be decoded and get the info out of it.
// check if it is not expired. Set initial state.
const token = localStorage.getItem("token");

if (token !== null) {
  const decodedToken: any = jwt_decode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const [loadToken, { loading, error }] = useMutation(GET_TOKEN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.getToken);
      navigate("/profile");
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const login = (email: string, password: string) => {
    loadToken({ variables: { email, password } });
    dispatch({
      type: "LOGIN",
      payload: { email },
    });
  };

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {" "}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
