'use client';
import { useState } from "react";

import { Button } from "@/components/ui/button";
import LoginForm from "@/components/Login";
import SignupForm from "@/components/Signup";
import OtpPopup from "@/components/Otppopup";

const Page: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showOtpPopup, setShowOtpPopup] = useState<boolean>(false);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="form-header">
          <h2>{isLogin ? "Login" : "Create an Account"}</h2>
          <Button onClick={toggleForm}>
            {isLogin ? "Switch to Signup" : "Switch to Login"}
          </Button>
        </div>
        {isLogin ? (
          <LoginForm showOtpPopup={setShowOtpPopup} />
        ) : (
          <SignupForm showOtpPopup={setShowOtpPopup} />
        )}
      </div>
      <OtpPopup showPopup={showOtpPopup} closePopup={() => setShowOtpPopup(false)} />
    </div>
  );
};

export default Page;
