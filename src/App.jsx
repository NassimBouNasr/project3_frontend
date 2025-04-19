import "./App.css";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/Signup";
import ChatComponent from "./components/ChatComponent";
import Groups from "./components/Groups";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import Members from "./components/Members";
import Friends from "./components/Friends";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/users/session", {
      credentials: "include", // important to send cookies/session
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
        setLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setLoggedIn(false);
      });
  }, []);

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}
      />

      <Route path="/signup" element={<SignUp />} />

      {/* Protected layout route */}
      <Route
        path="/"
        element={
          loggedIn ? <MainLayout user={user} /> : <Navigate to="/login" />
        }
      >
        {/* Nested routes that render inside MainLayout's <Outlet /> */}
        <Route index element={<Home />} />
        <Route path="chat" element={<ChatComponent />} />
        <Route path="groups" element={<Groups />} />
        <Route path="members" element={<Members />} />
        <Route path="friends" element={<Friends />} />
      </Route>
    </Routes>
  );
}

export default App;
