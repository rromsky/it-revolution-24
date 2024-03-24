import { Button } from "@mui/material";
import { SetStateAction } from "react";
import "./ui/index.css";
const AuthorizationModal = ({
  setIsPopupOpen,
}: {
  setIsPopupOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="popup-overlay">
      <div className="overlay" onClick={() => setIsPopupOpen(false)}></div>
      <div className="popup" onClick={(e) => e.preventDefault()}>
        <div className="popup-content">
          <h2>Вхід</h2>
          <input
            type="text"
            className="authorization-input"
            placeholder="Email"
          />
          <input
            type="password"
            className="authorization-input"
            placeholder="Password"
          />
          <div className="authorization-buttons">
            <Button color="warning">Увійти</Button>
            <Button onClick={() => setIsPopupOpen(false)}>Закрити</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationModal;
