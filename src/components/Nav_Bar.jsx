import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Nav_Bar() {
  const active = window.sessionStorage.getItem("active_item");
  const token = window.sessionStorage.getItem("Token");

  const navigate = useNavigate();

  function Logout() {
    window.sessionStorage.removeItem("Token");
    navigate("/login");
  }

  function RenderLogo() {
    if (active === "home") {
      return (
        <>
          <Link to="/" className=" navbar-brand active bg-success ">
            Botanica Gardenscape
          </Link>
        </>
      );
    } else {
      return (
        <Link to="/" className="navbar-brand">
          Botanica Gardenscape
        </Link>
      );
    }
  }

  // function RenderMenu() {
  //   //if (active === "home") {
  //     return (
  //       <ul className="navbar-nav mr-auto ">
  //         <li className="nav-item ">
  //           <Link to="/login" className="nav-link ">
  //             Login{" "}
  //           </Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link to="/registration" className="nav-link ">
  //             Register{" "}
  //           </Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link to="/garden" className="nav-link ">
  //             My Garden{" "}
  //           </Link>
  //         </li>
  //         <li className="nav-item active bg-success">
  //           <Link to="/user" className="nav-link ">
  //             User Info
  //           </Link>
  //         </li>
  //         <li className="nav-item logout ">
  //           <button
  //             type="button"
  //             className="btn btn-link text-white-50 pt1 "
  //             onClick={() => Logout()}
  //           >
  //             Logout
  //           </button>
  //         </li>
  //       </ul>
  //     );
  //   }

  // if (active === "garden") {
  //   return (
  //     <ul className="navbar-nav mr-auto ">
  //       <li className="nav-item active bg-success">
  //         <Link to="/garden" className="nav-link ">
  //           My Garden{" "}
  //         </Link>
  //       </li>
  //       <li className="nav-item">
  //         <button
  //           type="button"
  //           className="btn btn-link text-white-50"
  //           onClick={() => Logout()}
  //         >
  //           Logout
  //         </button>
  //       </li>
  //     </ul>
  //   );
  // }

  // if (active === "user") {
  //   return (
  //     <ul className="navbar-nav mr-auto ">
  //       <li className="nav-item ">
  //         <Link to="/garden" className="nav-link ">
  //           My Garden{" "}
  //         </Link>
  //       </li>
  //       <li className="nav-item active bg-success">
  //         <Link to="/user" className="nav-link ">
  //           User Info
  //         </Link>
  //       </li>
  //       <li className="nav-item">
  //         <button
  //           type="button"
  //           className="btn btn-link text-white-50"
  //           onClick={() => Logout()}
  //         >
  //           Logout
  //         </button>
  //       </li>
  //     </ul>
  //   );
  // }

  //   if (active === "registration") {
  //     return (
  //       <ul className="navbar-nav mr-auto ">
  //         <li className="nav-item  ">
  //           <Link to="/garden" className="nav-link ">
  //             My Garden{" "}
  //           </Link>
  //         </li>

  //         <li className="nav-item ">
  //           <Link to="/login" className="nav-link ">
  //             Login{" "}
  //           </Link>
  //         </li>
  //         <li className="nav-item active bg-success  ">
  //           <Link to="/registration" className="nav-link ">
  //             Register{" "}
  //           </Link>
  //         </li>
  //       </ul>
  //     );
  //   }
  // }

  return (
    <>
      {" "}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <span className="material-symbols-outlined">yard</span>
        <RenderLogo />

        <div className="collapse navbar-collapse">
          {/* //<RenderMenu /> */}

          <ul className="navbar-nav mr-auto ">
            {!token && (
              <div>
                <li className="nav-item ">
                  <Link to="/login" className="nav-link ">
                    Login{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/registration" className="nav-link ">
                    Register{" "}
                  </Link>
                </li>
              </div>
            )}

            {token && (
              <div>
                <li className="nav-item">
                  <Link to="/garden" className="nav-link ">
                    My Garden{" "}
                  </Link>
                </li>
                <li className="nav-item active bg-success">
                  <Link to="/user" className="nav-link ">
                    User Info
                  </Link>
                </li>
                <li className="nav-item logout ">
                  <button
                    type="button"
                    className="btn btn-link text-white-50 pt1 "
                    onClick={() => Logout()}
                  >
                    Logout
                  </button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
