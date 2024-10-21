import { FormEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface LoginFormProps {
  showOtpPopup: (show: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ showOtpPopup }) => {
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Logic for login, e.g., API request
    showOtpPopup(true); // Show OTP popup after login
  };

  return (
    <form onSubmit={handleLogin}>
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="name@example.com" required />
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Your Password" required />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
