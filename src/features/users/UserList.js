import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import User from "./User";
import ClipLoader from "react-spinners/ClipLoader";
import useTitle from "../../hooks/useTitle";
import "./users.css";

const UserList = () => {
  useTitle("Agencia Kame - Usuarios");
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const windowSize = useWindowSize()

  let content;

  if (isLoading)
    content = (
      <div className="loading">
        <ClipLoader color={"#63c0bb"} />
      </div>
    );
  if (isError) {
    content = <p className="errmsj">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <div className="users-dashboard">
        <div className="dashboard-title">
          <h2>Dashboard</h2>
        </div>
        <div className="row row-headings">
          <div className="head">Usuario</div>
          <div className="head center">Roles</div>
          {windowSize.width > 767 && <div className="head center">Última Sesión</div>}
          <div className="head center">Editar</div>
        </div>
        {tableContent}
      </div>   
    );
  }

/*   <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Usuario
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Editar
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table> */

  return (
    <div className="userlist">
      {/* <div className="table--title">
        <h2>Dashboard</h2>
      </div> */}
      {content}
      <div className="add-new-user">
        <Link to="/dash/usuarios/registro">
          <button>Añadir usuario</button>
        </Link>
      </div>
    </div>
  );
};

export default UserList;
