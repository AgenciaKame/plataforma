import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";
import usePersist from "../../../hooks/usePersist";
import InputForm from "../../../components/InputForm/InputForm";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import * as Unicons from "@iconscout/react-unicons";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const [aviso, setAviso] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("El servidor no responde");
      } else if (err.status === 400) {
        setErrMsg("Usuario o Contraseña incorrectos");
      } else if (err.status === 401) {
        setErrMsg("No autorizado");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading)
    return (
      <div className="loading">
        <ClipLoader color={"#63c0bb"} />;
      </div>
    );

  return (
    <>
      <Header />
      <div className="login-section">
        {aviso === true && (
          <div className="aviso-momentaneo" id="aviso">
            <button onClick={() => setAviso(false)}>
              <Unicons.UilTimes size={20} />
            </button>
            <p>Podés ingresar con:</p>
            <p>
              Email: <strong>prueba@gmail</strong>
            </p>
            <p>
              Clave: <strong>kame2022</strong>
            </p>
          </div>
        )}
        <div className="login-container">
          <div className="login-section-title">
            <h2>¿Comenzamos?</h2>
          </div>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-content">
              <InputForm
                name="email"
                type="email"
                reff={userRef}
                value={email}
                onChange={handleUserInput}
                placeholder="prueba@gmail.com"
                label="Email"
              />
              <InputForm
                name="password"
                type="password"
                value={password}
                onChange={handlePassword}
                placeholder="kame2022"
                label="Contraseña"
              />
              <div className="form-options">
                <Link to="/signup">Registrarse</Link>
                <Link to="/">¿Olvidaste la contraseña?</Link>
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  className="input-checkbox"
                  id="persist"
                  onChange={handleToggle}
                  checked={persist}
                />
                <label htmlFor="persist">Mantener sesión</label>
              </div>
              <div className="login-btn">
                <button>Ingresar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
