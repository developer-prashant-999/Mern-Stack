import React, { useState, useEffect } from "react";

function Home() {
  const [home, setHome] = useState("");
  const [show, setShow] = useState(false);
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
      setHome({
        ...home,
        name: data.name,
      });
      setShow(true);

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

  return (
    <div className="home-page">
      <div className="home-div">
        <p>WELCOME</p>
        <h1 className="t-5">{home.name}</h1>
        <h2 style={{ color: "blue", fontSize: "30px" }}>
          {show ? "Good to see you again" : "Users"}
        </h2>
      </div>
    </div>
  );
}

export default Home;
