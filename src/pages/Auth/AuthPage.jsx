import React, { useState } from "react";
import { Login } from "../../components";
import { Register } from "../../components";
import "./authPage.css";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthPageToggle = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <>
      <video
        className="auth-background-video"
        src="https://res.cloudinary.com/dsy7q8jga/video/upload/v1748326591/z54a14wat6kjiq0ndn8o.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="auth-background-overlay"></div>

      <div className="auth-container">
        {isLogin ? (
          <Login switchAuthHandler={handleAuthPageToggle} />
        ) : (
          <Register switchAuthHandler={handleAuthPageToggle} />
        )}
      </div>
    </>
  );
};