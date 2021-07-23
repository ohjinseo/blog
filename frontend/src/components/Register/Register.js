import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/actions/users/registerAction";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, user, error } = state.registerReducer;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(name, email, password));
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  return (
    <div className="inner">
      <form
        onSubmit={handleFormSubmit}
        style={{
          width: "100%",
          display: "flex",
          "justify-content": "center",
          "margin-top": "50px",
        }}
      >
        <div class="form-group">
          <label for="exampleInputname1" class="form-label mt-4">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "500px" }}
            type="name"
            class="form-control"
            id="exampleInputname1"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            required
          />
          <label for="exampleInputEmail1" class="form-label mt-4">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <label for="exampleInputPassword1" class="form-label mt-4">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            aria-describedby="PasswordHelp"
            placeholder="Enter Password"
            required
          />
          {error && (
            <span
              style={{ color: "red", "margin-top": "10px", display: "block" }}
            >
              {error}
            </span>
          )}
          <button
            type="submit"
            style={{ "margin-top": "37px", width: "100%" }}
            class="btn btn-lg btn-primary"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
