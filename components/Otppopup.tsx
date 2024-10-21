import { FormEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface OtpPopupProps {
  showPopup: boolean;
  closePopup: () => void;
}

const OtpPopup: React.FC<OtpPopupProps> = ({ showPopup, closePopup }) => {
  if (!showPopup) return null;

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle OTP submission logic
    closePopup();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h3>Enter OTP</h3>
        <form onSubmit={handleOtpSubmit}>
          <Input type="text" placeholder="Enter OTP" required />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default OtpPopup;
