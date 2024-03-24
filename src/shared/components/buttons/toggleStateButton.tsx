import { SetStateAction } from "react";

const OpenPopupButton = ({
  setIsPopupOpen,
}: {
  setIsPopupOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <a
      href="#"
      className="info-btn"
      onClick={() => {
        setIsPopupOpen((prevState) => !prevState);
      }}
    >
      Вхід/Реєстрація
    </a>
  );
};
export default OpenPopupButton;
