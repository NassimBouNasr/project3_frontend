import "./App.css";
import Login from "./components/Login";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/Signup";
import Home from "./components/Home";
function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={loggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
