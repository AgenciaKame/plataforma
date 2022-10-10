import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";
import usePersist from "../../../hooks/usePersist";
import InputForm from "../../../components/InputForm/InputForm";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import PulseLoader from "react-spinners/PulseLoader";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

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

  if (isLoading) return <PulseLoader color={'#fff'} />;
  return (
    <>
      <Header />
      <div className="login-section">
        <div className="login-container">
          <div className="login-section-title">
            <h2>¿Comenzamos?</h2>
          </div>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <form className="login-form" onSubmit={handleSubmit}>
            <InputForm
              name="email"
              type="email"
              reff={userRef}
              value={email}
              onChange={handleUserInput}
              placeholder="Ingresa tu email"
              label="Email"
            />
            <InputForm
              name="password"
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Ingresa tu contraseña"
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
              <label htmlFor="persist">Guardar última sesión</label>
            </div>
            <div className="login-btn">
              <button>Ingresar</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
