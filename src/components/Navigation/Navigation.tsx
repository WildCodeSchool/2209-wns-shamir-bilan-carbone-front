import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  console.log(authToken);

  return (
    <div className="navigation-wrapp">
      <div
        className={
          authToken
            ? "navigation navigation-wide"
            : "navigation navigation-narrow"
        }
      >
        <Link to="/" className="link">
          <div>Just Reduce</div>
        </Link>

        {!authToken && <div>|</div>}

        {authToken && (
          <Link to="/profile" className="link">
            My profile
          </Link>
        )}

        {authToken ? (
          <div
            className="link"
            onClick={() => {
              localStorage.removeItem("token");
              navigate(`/`);
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/Login" className="link">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
