import React from "react";
import { useNavigate } from "react-router-dom";
function Errorpage() {
  const navigate = useNavigate();
  return (
    <div classname="notfound">
      <div className="background">
        <h1 style={{ fontSize: "300px", color: "black" }}>404</h1>
      </div>

      <div className="uptext">
        <h1 style={{ fontSize: "60px", color: "black" }}>
          Sorry page not found
        </h1>
        <p>The page you are trying to visit is not available. </p>
        <button
          style={{ width: "200px", backgroundColor: "white", color: "black" }}
          type="submit"
          className="redirect"
          onClick={() => {
            navigate("/");
          }}
        >
          Redirect
        </button>
      </div>
    </div>
  );
}

export default Errorpage;
