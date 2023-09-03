import React, { useReducer, createContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { GET_TOKEN } from "../gql/mutations";
import { Alert } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import IUser from "../interfaces/IUser";

const initialState = {
  user: null,
};

export type AuthContextType = {
  user: IUser;
  currentUser: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

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
  // user: null,
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // login: (userData) => {},
  // logout: () => {},
  user: {} as IUser,
  currentUser: {} as IUser,
  login: (email: string, password: string) => {}, // Update the argument types if needed
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
      navigate("profile/recipes");
    },
    onError: (error) => {
      console.log(error);
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
    <AuthContext.Provider
      value={{ user: state.user, currentUser: state.user, login, logout }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
