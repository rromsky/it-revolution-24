import { Button } from "@mui/material";
import { SetStateAction, useState } from "react";
import "./ui/index.css";
import { toast } from "react-toastify";
import { userRegister, userSignIn } from "../../firebase/firebaseApi";

type loginProps = {
  email: string;
  password: string;
  passwordRepeat?: string;
};

const emailValidator =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const onClickLogin = async ({ email, password }: loginProps) => {
  if (!emailValidator.test(email)) {
    toast.error("E-Mail виглядає хибним!");
    return;
  }
  if (password.length < 6) {
    toast.error("Пароль занадто короткий!");
    return;
  }
  userSignIn({ email, password })
    .then(() => {
      toast.success("Успішний вхід");
    })
    .catch(() => {
      toast.error("Помилка входу");
    });
};

const onClickRegister = async ({
  email,
  password,
  passwordRepeat,
}: loginProps) => {
  if (!emailValidator.test(email)) {
    toast.error("E-Mail виглядає хибним!");
    return;
  }
  console.log(password, passwordRepeat);
  if (password !== passwordRepeat) {
    toast.error("Паролі не співпадають!");
    return;
  }
  if (password.length < 6) {
    toast.error("Пароль занадто короткий!");
    return;
  }
  userRegister({ email, password })
    .then(() => {
      toast.success("Успішна реєстрація");
    })
    .catch(() => {
      toast.error("Помилка реєстрації");
    });
};

const AuthorizationModal = ({
  setIsPopupOpen,
}: {
  setIsPopupOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  return (
    <div className="popup-overlay">
      <div className="overlay" onClick={() => setIsPopupOpen(false)}></div>
      <div className="popup" onClick={(e) => e.preventDefault()}>
        <div className="popup-content">
          <h2>{isRegistration ? "Реєстрація" : "Вхід"}</h2>
          <input
            type="text"
            className="authorization-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="authorization-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistration && (
            <input
              type="password"
              className="authorization-input"
              placeholder="Repeat Password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          )}
          <a
            href="#"
            onClick={() => {
              setIsRegistration((prevState) => !prevState);
            }}
            className="change-auth-type-link"
          >
            {isRegistration ? "Ввійти в існуючий акаунт." : "Зареєструватись."}
          </a>
          <div className="authorization-buttons">
            <Button
              color="warning"
              onClick={
                isRegistration
                  ? () => onClickRegister({ email, password, passwordRepeat })
                  : () => onClickLogin({ email, password })
              }
            >
              {isRegistration ? "Зареєструватись" : "Увійти"}
            </Button>
            <Button onClick={() => setIsPopupOpen(false)}>Закрити</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationModal;
