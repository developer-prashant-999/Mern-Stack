import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { userContext } from "../App";
function Logout() {
  const { state, dispatch } = useContext(userContext);
  const navigator = useNavigate();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        navigator("/login");
        if (res.status != 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
export default Logout;
// this is logout page
