import { useState } from "react";
import AuthorizationModal from "../../modals/authorization";
import OpenPopupButton from "../../shared/components/buttons/toggleStateButton";
const WelcomePage = ({ user }: { user: any }) => {
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

          {<OpenPopupButton setIsPopupOpen={setIsPopupOpen} />}
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
