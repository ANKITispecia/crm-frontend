'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/Login";
import SignupForm from "@/components/Signup";
import OtpPopup from "@/components/Otppopup";
import Image from "next/image";

const Page: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showOtpPopup, setShowOtpPopup] = useState<boolean>(false);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="auth-page h-screen w-screen flex">
      {/* Left section: only visible on large screens */}
      <div className="hidden lg:flex flex-col justify-center bg-[#fe6601] w-[40vw] h-screen items-center">
        {/* Logo in black circle */}
        <div className="bg-black rounded-full h-32 w-32 flex items-center justify-center mt-20">
          <Image
            src={'/assets/logo.png'}
            alt="logo"
            width={100} // Adjust width and height to fit in the circle
            height={100}
          />
        </div>
        
        {/* Heading and paragraph below the logo */}
        <div className="text-center mt-6 px-6">
          <h1 className="text-white text-3xl font-bold">Client Relationship Management</h1>
          <p className="text-white mt-4">Manage your clients and business operations with ease through our platform easily and efficiently xxxxxxxxxxxxxxxxxxxxxxxxxx.</p>
        </div>
      </div>

      {/* Right section: form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-[60vw] p-6">
        <div className="form-header mb-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Create an Account"}</h2>
          <Button onClick={toggleForm} className="mb-4">
            {isLogin ? "Switch to Signup" : "Switch to Login"}
          </Button>
        </div>
        {/* Conditional rendering of login or signup forms */}
        {isLogin ? (
          <LoginForm showOtpPopup={setShowOtpPopup} />
        ) : (
          <SignupForm showOtpPopup={setShowOtpPopup} />
        )}
      </div>

      {/* OTP Popup */}
      <OtpPopup showPopup={showOtpPopup} closePopup={() => setShowOtpPopup(false)} />
    </div>
  );
};

export default Page;
