import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_TOKEN } from "../../gql/mutations";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  });

  const [loadToken] = useMutation(GET_TOKEN, {
    variables: {
      email: username,
      password: password,
    },
    onCompleted(data) {
      // console.log(data.getToken);
      localStorage.setItem("token", data.getToken);
      navigate("/profile");
    },
    onError(error) {
      console.log(error);
    },
  });
  return (
    <div className="container">
      <div className="login-wrapp">
        <div className="wrapp">
          <label>Login </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="wrapp">
          {/* {" "} */}
          <label>Password </label>
          <input
            className="form-input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {/* {" "} */}
        <button
          className="submit-button"
          onClick={() => {
            loadToken();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
