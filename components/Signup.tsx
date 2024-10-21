import { FormEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface SignupFormProps {
  showOtpPopup: (show: boolean) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ showOtpPopup }) => {
  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    // Logic for sign up, e.g., API request
    showOtpPopup(true); // Show OTP popup after signup
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="name@example.com" required />
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Create Password" required />
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignupForm;
