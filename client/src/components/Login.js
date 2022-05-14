import React, { useContext, useState } from "react";
import signpic from "./images/pic.jpg";
import { useNavigate } from "react-router-dom";
import { AiOutlineUnlock, AiOutlineMail } from "react-icons/ai";
import { userContext } from "../App";

function Login() {
  const { state, dispatch } = useContext(userContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Loginuser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Inavalid");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login success");
      navigate("/");
    }
  };
  return (
    <div className="signin">
      <div className="cont-2">
        <div className="signup-form">
          <h2 className="form-title">Login</h2>
          <form className="register-form" id="register-form" method="POST">
            <div className="form-group">
              <label className="label">
                <AiOutlineMail />
              </label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="label">
                <AiOutlineUnlock />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Your Password"
              />
            </div>

            <div className="form-group form-button">
              <button type="submit" className="button" onClick={Loginuser}>
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="signup-image">
          <figure>
            <img src={signpic} alt="pic" className="img-login" />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Login;
