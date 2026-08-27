import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MindCare
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/therapists">
          Therapists
        </Link>

        {token ? (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <span className="user-name">
              Hi, {user?.name}
            </span>

            <button
              onClick={logout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;