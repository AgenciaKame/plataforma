import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "../usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../../components/InputForm/InputForm";
/* import { ROLES } from "../../../config/roles"; */
import "../../auth/Login/Login.css";
import "./Signup.css";

/* const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/; */

const Signup = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  /* const [validEmail, setValidEmail] = useState(false); */
  const [password, setPassword] = useState("");
  /* const [validPassword, setValidPassword] = useState(false); */
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState(["Nivel 1"]);

/*   useEffect(() => {
    setValidEmail(USER_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]); */

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRoles(["Nivel 1"]);
      navigate("/dash/usuarios");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);

  /* const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  }; */

  const canSave =
    [roles.length/* , validEmail, validPassword */].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ name, lastName, email, password, confirmPassword, roles });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
/*   const validUserClass = !validEmail ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : ""; */
  /* const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : ""; */

  /* const { pathname } = useLocation(); */
  /* 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }; */

  return (
    <div className="login-section">
      <div className="login-container">
        <div className="login-section-title">
          <h2>Registro de Usuarios</h2>
        </div>
        <p className={errClass}>{error?.data?.message}</p>
        <form className="login-form" onSubmit={onSaveUserClicked}>
          <InputForm
            name="name"
            type="text"
            value={name}
            onChange={onNameChanged}
            placeholder="Ingresa tu nombre"
            label="Nombre"
          />
          <InputForm
            name="lastName"
            type="text"
            value={lastName}
            onChange={onLastNameChanged}
            placeholder="Ingresa tu apellido"
            label="Apellido"
          />
          <InputForm
            name="email"
            type="email"
            value={email}
            onChange={onEmailChanged}
            placeholder="Ingresa tu email"
            label="Email"
/*             className= {`${validUserClass}`} */
          />
          <InputForm
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
            placeholder="Ingresa tu contraseña"
            label="Contraseña"
/*             className={`${validPwdClass}`} */
          />
          <InputForm
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChanged}
            placeholder="Confirma tu contraseña"
            label="Confirmar Contraseña"
          />
          <div className="form-options options-signup">
            <Link to="/login">Ya tengo cuenta</Link>
          </div>
          <div className="login-btn">
            <button>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
