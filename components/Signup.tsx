import { FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SignupFormProps {
  showOtpPopup: (show: boolean) => void;
  userType: "admin" | "manager" | "customer" | "development"; // Update userType options
}

const SignupForm: React.FC<SignupFormProps> = ({ showOtpPopup, userType }) => {
  const [specialCode, setSpecialCode] = useState<string>(""); // State for special code input
  const [otp, setOtp] = useState<string>(""); // State for OTP input
  const [otpSent, setOtpSent] = useState<boolean>(false); // State to check if OTP is sent

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const apiUrl = `/api/${userType}/signup`; // API URL based on userType

    // Perform the signup request here
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: (document.getElementById("email") as HTMLInputElement).value,
        password: (document.getElementById("password") as HTMLInputElement).value,
        specialCode: userType !== "customer" ? specialCode : undefined, // Include special code if not customer
      }),
    })
      .then(response => {
        if (response.ok) {
          generateOtp(); // Generate OTP after successful signup
        } else {
          // Handle signup error
          console.error('Signup failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const generateOtp = () => {
    const apiUrl = `/api/${userType}/generate-otp`; // Adjust according to your API

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: (document.getElementById("email") as HTMLInputElement).value,
      }),
    })
      .then(response => {
        if (response.ok) {
          setOtpSent(true); // Update state to indicate OTP has been sent
        } else {
          console.error('Failed to generate OTP');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    const apiUrl = `/api/${userType}/verify-otp`; // Adjust according to your API

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: (document.getElementById("email") as HTMLInputElement).value,
        otp,
      }),
    })
      .then(response => {
        if (response.ok) {
          showOtpPopup(true); // Show OTP popup after successful verification
        } else {
          console.error('OTP verification failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="name@example.com" required />
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Create Password" required />
      {userType !== "customer" && ( // Show special code input if not customer
        <>
          <Label htmlFor="specialCode">Special Code</Label>
          <Input 
            type="text" 
            id="specialCode" 
            placeholder="Enter Special Code" 
            value={specialCode}
            onChange={(e) => setSpecialCode(e.target.value)}
            required 
          />
        </>
      )}
      {otpSent ? ( // Show OTP input field if OTP has been sent
        <>
          <Label htmlFor="otp">Enter OTP</Label>
          <Input 
            type="text" 
            id="otp" 
            placeholder="Enter OTP" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required 
          />
          <Button type="submit" onClick={handleOtpSubmit}>Verify OTP</Button> {/* Button to verify OTP */}
        </>
      ) : (
        <Button type="submit" onClick={handleSignup}>Sign Up</Button>
      )}
    </form>
  );
};

export default SignupForm;
