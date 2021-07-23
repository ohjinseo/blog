import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "../../css/common.css";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/actions/users/logoutAction";

const Navbar = () => {
  const history = useHistory();
  const state = useSelector((state) => state);
  const { user } = state.loginReducer;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    history.push("/");
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="inner">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarColor03">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <Link to="/" class="nav-link active" href="#">
                    Home
                    <span class="visually-hidden">(current)</span>
                  </Link>
                </li>
                {user && (
                  <>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        Write
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        Posts
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        Profile
                      </a>
                    </li>
                    <li class="nav-item">
                      <a onClick={handleLogout} class="nav-link" href="#">
                        Logout
                      </a>
                    </li>
                  </>
                )}

                {!user && (
                  <>
                    <li class="nav-item">
                      <Link to="/login" class="nav-link" href="#">
                        Login
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/register" class="nav-link" href="#">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <form class="d-flex">
                <input
                  class="form-control me-sm-2"
                  type="text"
                  placeholder="Search"
                />
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
