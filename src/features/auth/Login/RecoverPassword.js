import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSendEmailMutation, useChangePasswordMutation } from "../../users/usersApiSlice";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import InputForm from "../../../components/InputForm/InputForm";
import ClipLoader from "react-spinners/ClipLoader";
import "./Login.css";

const RecoverPassword = () => {
  const [sendEmail, { isLoading, isSuccess, isError, error }] =
    useSendEmailMutation();
  const [changePassword, { isSuccess: isChangeSuccess, isError: isChangeError, error: changeError}] =
    useChangePasswordMutation();
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/cambiodeclave/done", {state: 'email sent'});
    } else if (isChangeSuccess) {
      navigate("/cambiodeclave/done", {state: 'password changed'});
    }
  }, [isSuccess, isChangeSuccess, navigate]);

  const errClass = isError || isChangeError ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || changeError?.data?.message) ?? "";

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    await sendEmail({ email });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassword("");
    setConfirmPassword("")
    await changePassword({ id, password, confirmPassword})
  };

  /*   if (isError) {
    errRef.current.focus();
  } */
  if (isLoading)
    return (
      <div className="loading">
        <ClipLoader color={"#63c0bb"} />
      </div>
    );

  let inputsContent;

  if (id === undefined)
    inputsContent = (
      <InputForm
        label="Ingresa tu email"
        type="email"
        reff={userRef}
        onChange={handleEmail}
        value={email}
      />
    );

  if (id !== undefined)
    inputsContent = (
      <>
        <InputForm
          label="Ingresa tu nueva contraseña"
          type="password"
          reff={userRef}
          onChange={handlePassword}
          value={password}
        />
        <InputForm
          label="Confirma tu contraseña"
          type="password"
          onChange={handleConfirmPassword}
          value={confirmPassword}
        />
      </>
    );

  return (
    <>
      <Header />
      <div className="login-section">
        <div className="login-container">
          <div className="login-section-title">
            <h2>Recuperación de contraseña</h2>
          </div>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errContent}
          </p>
          <form className="form-change-password" onSubmit={id === undefined ? handleEmailSubmit : handlePasswordSubmit}>
            <div className="form-data">{inputsContent}</div>
            <div className="form-button">
              <button>{id === undefined ? 'Enviar correo de recuperación' : 'Guardar contraseña'}</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecoverPassword;
