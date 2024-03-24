import { SetStateAction, useState } from "react";
import AuthorizationModal from "./modals/authorization";
import "./App.css";
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
const App = () => {
  const user = false;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section>
      {isPopupOpen && <AuthorizationModal setIsPopupOpen={setIsPopupOpen} />}
      <div className="content">
        <div className="info">
          <h2>
            Інформація <br />
            <span>Про індивідуальне завдання.</span>
          </h2>
          <p>
            Завдання полягає в створені веб додатку, для скоротшеня посилань. А
            також, для перегляду статистики переходів по ним. Було реалізовано
            такі функції як: створення скорочених посилань, перегляд статистики
            переходів по ним, можливість видалення посилань, а також розділення
            за користувачами.
          </p>

          {user ? <></> : <OpenPopupButton setIsPopupOpen={setIsPopupOpen} />}
        </div>
      </div>
    </section>
  );
};

export default App;
