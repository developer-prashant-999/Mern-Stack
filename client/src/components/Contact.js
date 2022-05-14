import React, { useEffect, useState } from "react";
import "../App.css";
import contactpic from "./images/pic2.jpg";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineMessage,
} from "react-icons/ai";
function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const callAbout = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      // console.log(setData(data));

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callAbout();
  }, []);

  const Input = (e) => {
    // e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();

    if (!data) {
      window.alert("Messaeg sent fail");
    } else {
      window.alert("Message sent successful");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <div className="Contact">
      <div className="top">
        <div className="column">
          <h2>Name</h2>
          <p>{userData.name}</p>
        </div>
        <div className="column">
          <h2>Phone</h2>
          <p>{userData.phone}</p>
        </div>
        <div className="column">
          <h2>Email</h2>
          <p>{userData.email}</p>
        </div>
      </div>

      <div className="signup">
        <div className="containers c1">
          <div className="signup-form">
            <h1 className="form-title">Get In Touch</h1>
            <form className="register-form" id="register-form" method="POST">
              <div className="form-group f1">
                <label className="label l1">
                  <AiOutlineUser />
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  placeholder="Your Name"
                  onChange={Input}
                  value={userData.name}
                />
              </div>
              <div className="form-group f1">
                <label className="label l1">
                  <AiOutlineMail />
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Your Email"
                  onChange={Input}
                  value={userData.email}
                />
              </div>

              <div className="form-group f1">
                <label className="label l1">
                  <AiOutlinePhone />
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  placeholder="Your Phone"
                  onChange={Input}
                  value={userData.phone}
                />
              </div>
              <div className="form-group f1">
                <label className="label l1">
                  <AiOutlineMessage />
                </label>

                <textarea
                  name="message"
                  id="message"
                  className="message"
                  rows="10"
                  cols="30"
                  placeholder="Your Message"
                  onChange={Input}
                  value={userData.message}
                ></textarea>
              </div>
              <div className="form-button">
                <button type="submit" className="button b1" onClick={PostData}>
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img src={contactpic} alt="pic" className="img-login" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
