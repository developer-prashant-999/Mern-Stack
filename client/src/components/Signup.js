import React, { useState } from "react";
import signpic from "./images/pic.jpg";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiTwotoneMail,
  AiOutlineUnlock,
  AiFillPhone,
} from "react-icons/ai";

function Signup() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const inputdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (data.status == 422 || !data) {
      window.alert("Invalid registration");
    } else {
      window.alert("Registration successful");
      navigate("/login");
    }
  };

  return (
    <div className="signup">
      <div className="containers">
        <div className="signup-form">
          <h2 className="form-title">Sign up</h2>
          <form method="POST" className="register-form" id="register-form">
            <div className="form-group">
              <label className="label">
                <AiOutlineUser />
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                placeholder="Your Name"
                onChange={inputdata}
                value={user.name}
              />
            </div>
            <div className="form-group">
              <label className="label">
                <AiTwotoneMail />
              </label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Your Email"
                onChange={inputdata}
                value={user.email}
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
                placeholder="Your Password"
                onChange={inputdata}
                value={user.password}
              />
            </div>

            <div className="form-group">
              <label className="label">
                <AiOutlineUnlock />
              </label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                autoComplete="off"
                placeholder="Conform Password"
                onChange={inputdata}
                value={user.cpassword}
              />
            </div>
            <div className="form-group">
              <label className="label">
                <AiFillPhone />
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                autoComplete="off"
                placeholder="Your Phone"
                onChange={inputdata}
                value={user.phone}
              />
            </div>
            <div className="form-group form-button">
              <button type="submit" className="button" onClick={PostData}>
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="signup-image">
          <figure>
            <img src={signpic} alt="pic" className="img" />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Signup;
