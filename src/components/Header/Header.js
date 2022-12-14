import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import "./Header.css";
import logoLetter from "../../assets/logo-letters.png";
import * as Unicons from "@iconscout/react-unicons";
import ClipLoader from "react-spinners/ClipLoader";

const LinkRouter = ({ link, name, children, setMenuOpened }) => {
  return (
    <li onClick={() => setMenuOpened(false)}>
      <Link to={link}>
        {children}
        <span>{name}</span>
      </Link>
    </li>
  );
};
const LinkNav = ({ link, name, children, setMenuOpened }) => {
  return (
    <li onClick={() => setMenuOpened(false)}>
      <a href={link} target="__Blank">
        {children}
        <span>{name}</span>
      </a>
    </li>
  );
};

const Header = () => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { isAdmin, isLogged } = useAuth(); /* name, lastName */
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading)
    return (
      <div className="loading">
        <ClipLoader color={"#63c0bb"} />
      </div>
    );

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <header className="header_platform">
      <nav className={`nav-platform ${scroll ? "nav-scroll" : null}`}>
        <div className="nav-logo">
          <Link to={isLogged ? "/dash" : "/login"}>
            <img src={logoLetter} alt="logo" />
          </Link>
        </div>
        <div
          className="nav-menu"
          onClick={() => setMenuOpened((current) => !current)}
        >
          {/* {isLogged ? <span>{name.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}</span> : <Unicons.UilUser color="#ffffff" />} */}
          <Unicons.UilUser color="#ffffff" />
        </div>
      </nav>
      {isMenuOpened === true ? (
        <div className="nav-menu-modal">
          <ul>
            {isAdmin && (
              <LinkRouter
                name="Usuarios"
                link="/dash/usuarios"
                setMenuOpened={setMenuOpened}
              >
                <Unicons.UilCreateDashboard color="#ffffff" />
              </LinkRouter>
            )}
            <LinkNav
              name="Instagram"
              link="https://www.instagram.com/agenciakame/"
              setMenuOpened={setMenuOpened}
            >
              <Unicons.UilInstagram color="#ffffff" />
            </LinkNav>
            <LinkNav
              name="Youtube"
              link="https://www.instagram.com/agenciakame/"
              setMenuOpened={setMenuOpened}
            >
              <Unicons.UilYoutube color="#ffffff" />
            </LinkNav>
            <LinkNav
              name="Whatsapp"
              link="https://www.instagram.com/agenciakame/"
              setMenuOpened={setMenuOpened}
            >
              <Unicons.UilWhatsapp color="#ffffff" />
            </LinkNav>
            <LinkNav
              name="Linkedin"
              link="https://www.linkedin.com/company/agencia-kame/"
              setMenuOpened={setMenuOpened}
            >
              <Unicons.UilLinkedinAlt color="#ffffff" />
            </LinkNav>
            <li onClick={sendLogout}>
              <Link>
                <Unicons.UilSignout color="#ffffff" />
                <span>Cerrar Sesi??n</span>
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
