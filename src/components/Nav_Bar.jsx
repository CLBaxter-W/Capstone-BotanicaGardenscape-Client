import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Nav_Bar() {
  const token = window.sessionStorage.getItem("Token");

  const navigate = useNavigate();

  function Logout() {
    window.sessionStorage.removeItem("Token");
    navigate("/login");
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <span className="material-symbols-outlined">yard</span>

        <NavLink to="/" className="navbar-brand ">
          Botanica Gardenscape
        </NavLink>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto ">
            {!token && (
              <div>
                <li className="nav-item ">
                  <NavLink to="/login" className="nav-link ">
                    Login{" "}
                  </NavLink>
                </li>{" "}
              </div>
            )}
            {!token && (
              <div>
                <li className="nav-item">
                  <NavLink to="/registration" className="nav-link ">
                    Register{" "}
                  </NavLink>
                </li>
              </div>
            )}

            {token && (
              <div>
                <li className="nav-item">
                  <NavLink to="/garden" className="nav-link ">
                    My Garden{" "}
                  </NavLink>
                </li>
              </div>
            )}
            {token && (
              <div>
                <li className="nav-item ">
                  <NavLink to="/user" className="nav-link ">
                    User Info
                  </NavLink>
                </li>
              </div>
            )}
            {token && (
              <div>
                <li className="nav-item logout center">
                  <button
                    type="button"
                    className="btn nav-link "
                    onClick={() => Logout()}
                  >
                    Logout
                  </button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
