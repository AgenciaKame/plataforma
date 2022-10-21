import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import check from "../../../assets/confirm-icon.png";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import "./Login.css";

const PromptDone = () => {
  const prev = useLocation().state
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 10000)
  }, [navigate])

  let pContent;
  if (prev === 'email sent') pContent = <p>Tu cambio de contraseña ha sido enviado</p>
  if (prev === 'password changed') pContent = <p>Tu contraseña se ha cambiado correctamente</p>
  return (
    <>
      <Header />
      <div className="login-section">
        <div className="login-container">
          <div className="success-div">
            <div className="message-box">
              <img src={check} alt="check" />
              {pContent}
            </div>
            <button>
              <Link to="/login">Volver</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PromptDone;
