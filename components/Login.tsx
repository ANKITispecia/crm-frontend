import { FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface LoginFormProps {
  showOtpPopup: (show: boolean) => void;
  userType: "admin" | "manager" | "customer" | "development";
}

const LoginForm: React.FC<LoginFormProps> = ({ showOtpPopup, userType }) => {
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [specialCode, setSpecialCode] = useState<string>(""); // State for special code input

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Login logic
    const apiUrl = `/api/${userType}/login`;

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
          generateOtp();
        } else {
          console.error('Login failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const generateOtp = () => {
    const apiUrl = `/api/${userType}/generate-otp`;

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
          setOtpSent(true);
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
    const apiUrl = `/api/${userType}/verify-otp`;

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
          showOtpPopup(true);
        } else {
          console.error('OTP verification failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="name@example.com" required />
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Your Password" required />
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
      <Button type="button" onClick={generateOtp} className="ml-2">Generate OTP</Button>
      {otpSent && (
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
          <Button type="submit" onClick={handleOtpSubmit}>Verify OTP</Button>
        </>
      )}
      {!otpSent && <Button type="submit">Login</Button>}
    </form>
  );
};

export default LoginForm;
