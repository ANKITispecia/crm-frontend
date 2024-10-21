'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/Login";
import SignupForm from "@/components/Signup";
import OtpPopup from "@/components/Otppopup";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";

const Page: React.FC = () => {
  const [userType, setUserType] = useState<"staff" | "customer" | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showOtpPopup, setShowOtpPopup] = useState<boolean>(false);

  const handleUserTypeSelection = (type: "staff" | "customer") => {
    setUserType(type);
    setIsLogin(true);
  };

  const toggleForm = () => setIsLogin(!isLogin);

  const handleBack = () => {
    setUserType(null);
  };

  return (
    <div className="auth-page h-screen w-screen flex">
      {/* Left section omitted for brevity */}
      <div className="hidden lg:flex flex-col justify-center bg-[#fe6601] w-[40vw] h-screen items-center">
        {/* Logo in black circle */}
        <div className="bg-black rounded-full h-32 w-32 flex items-center justify-center mt-20">
          <Image
            src={'/assets/logo.png'}
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        
        {/* Heading and paragraph below the logo */}
        <div className="text-center mt-6 px-6">
          <h1 className="text-white text-3xl font-bold">Client Relationship Management</h1>
          <p className="text-white mt-4">Manage your clients and business operations with ease through our platform easily and efficiently xxxxxxxxxxxxxxxxxxxxxxxxxx.</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full lg:w-[60vw] p-6">
        {!userType ? (
          <div className="flex flex-col space-y-4 mb-6">
            <Button onClick={() => handleUserTypeSelection("staff")}>Organization</Button>
            <Button onClick={() => handleUserTypeSelection("customer")}>Customer</Button>
          </div>
        ) : (
          <>
            <Button onClick={handleBack} className="mb-4 flex items-center">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div className="form-header mb-6 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">{isLogin ? `${userType.charAt(0).toUpperCase() + userType.slice(1)} Login` : `Create ${userType.charAt(0).toUpperCase() + userType.slice(1)} Account`}</h2>
              <Button onClick={toggleForm} className="mb-4">
                {isLogin ? "Switch to Signup" : "Switch to Login"}
              </Button>
            </div>
            {isLogin ? (
              <LoginForm userType={userType} showOtpPopup={setShowOtpPopup} />
            ) : (
              <SignupForm userType={userType} showOtpPopup={setShowOtpPopup} />
            )}
          </>
        )}
      </div>

      {/* OTP Popup omitted for brevity */}
    </div>
  );
};

export default Page;
