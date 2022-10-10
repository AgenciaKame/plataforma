import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isLogged = false
  let status = "Client";

  if (token) {
    const decoded = jwtDecode(token);
    const { email, name, lastName, roles } = decoded.UserInfo;

    isAdmin = roles.includes("Admin");
    isLogged = true

/*     let initials = `${name.toString().charAt(0).toUppercase()}${lastName.toString().charAt(0).toUpperCase()}` */

    if (isAdmin) status = "Admin";

    return { email, name, lastName, roles, status, isAdmin, isLogged };
  }

  return { email: "", roles: [], isAdmin, isLogged, status };
};

export default useAuth;
