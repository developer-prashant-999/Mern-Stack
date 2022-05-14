import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "./images/profile.jpg";

function About() {
  const navivate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAbout = async () => {
    try {
      const res = await fetch("/aboutme", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      // console.log(setData(data));

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navivate("/login");
    }
  };
  useEffect(() => {
    callAbout();
  }, []);
  return (
    <>
      <div className="cont-2">
        <form method="GET">
          <div className="row">
            <div className="col">
              <img src={profile} alt="pic" className="img-abt" />
            </div>
            <div className="col">
              <h1>{userData.name}</h1>
              <h2 style={{ color: "blue", fontweight: "bold" }}>
                web developer
              </h2>
              <h2>Ranking : 1/10</h2>
              <br />
              <br />
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                  >
                    Timeline
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <button type="submit" className="b-a">
                Edit profile
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p style={{ color: "indigo" }}>Facebook</p>
              <p style={{ color: "red" }}>Gmail</p>
              <p style={{ color: "black" }}>Github</p>
              <p style={{ color: "orange" }}>Instagram</p>
              <p style={{ color: "crimson" }}>Computer Engineer</p>
            </div>

            <div className="col">
              <p style={{ color: "indigo" }}>Name</p>
              <p style={{ color: "red" }}>Address</p>
              <p style={{ color: "black" }}>Name</p>
              <p style={{ color: "orange" }}>Name</p>
              <p style={{ color: "crimson" }}>Profession</p>
            </div>

            <div className="col">
              <p style={{ color: "indigo" }}>{userData.name}</p>
              <p style={{ color: "red" }}>{userData.email}</p>
              <p style={{ color: "black" }}>{userData.name}</p>
              <p style={{ color: "orange" }}>Developer-prashant-999</p>
              <p style={{ color: "crimson" }}>Web Developer</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default About;
