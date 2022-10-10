import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import logo from "../../../assets/logo-white-letters.png";
import "./Welcome.css";

const Welcome = () => {
  useTitle('Agencia Kame - Plataforma')
  return (
    <div className="welcome-section">
      <div className="welcome-image">
        <img src={logo} alt="logo" />
      </div>
      <div className="welcome-info">
        <div className="welcome-title">
          <h2>Bienvenidos</h2>
        </div>
        <div className="welcome-text">
          <p>
            Acá podrás escribir un texto de bienvenida para tus clientes y
            agregar una imagen o animación para darles la bienvenida.
          </p>
        </div>
        <div className="welcome-btn">
          <button>
            <Link to='/dash/categorias'>Comencemos</Link>
          </button>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
