import "./App.css";
import Login from "./components/Login";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/Signup";
import ChatComponent from "./components/ChatComponent";
import Groups from "./components/Groups";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import Members from "./components/Members";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected layout route */}
      <Route
        path="/"
        element={loggedIn ? <MainLayout /> : <Navigate to="/login" />}
      >
        {/* Nested routes that render inside MainLayout's <Outlet /> */}
        <Route index element={<Home />} />
        <Route path="chat" element={<ChatComponent />} />
        <Route path="groups" element={<Groups />} />
        <Route path="members" element={<Members />} />
      </Route>
    </Routes>
  );
}

export default App;
