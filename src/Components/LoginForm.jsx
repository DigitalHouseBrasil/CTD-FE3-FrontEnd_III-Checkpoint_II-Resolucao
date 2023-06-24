import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextGlobal } from "./utils/global.context";
import { setTokenInStorage } from "./utils/localStorage.service";
import styles from "./Form.module.css";
import apiBaseUrl from "../api";

const LoginForm = () => {
  const { theme, setLogin } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`${apiBaseUrl}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.login,
          password: data.password,
        }),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        setTokenInStorage(responseData.token);
        setLogin();
        navigate("/home");

      } else {
        throw response.status;
      }

    } catch (error) {
      console.log(error);
      alert("Não foi possível realizar o login!\nVerifique suas credenciais e tente novamente.")
    }
  };

  return (
    <div
      className={`text-center card container ${styles.card} ${isDarkMode ? styles.cardDark : ""
        }`}
    >
      <div className={`card-body ${styles.CardBody}`}>
        <form onSubmit={handleSubmit}>
          <input
            className={`form-control ${styles.inputSpacing}`}
            placeholder="Login"
            name="login"
            required
          />
          <input
            className={`form-control ${styles.inputSpacing}`}
            placeholder="Password"
            name="password"
            type="password"
            required
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
