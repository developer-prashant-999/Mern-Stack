import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Errorpage from "./components/errorpage";
import Logout from "./components/Logout";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/reducer";
export const userContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        {/* routes */}
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/aboutme" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Logout />} path="/logout" />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
