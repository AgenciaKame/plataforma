import { useNavigate } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";

/* import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice' */

import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";

import "./users.css";

const User = ({ userId }) => {
  /* const user = useSelector(state => selectUserById(state, userId)) */

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/usuarios/${userId}`);

    /* const userRolesString = user.roles.toString().replaceAll(',', ', ') */
    const userRolesList = (
      <ul>
        {" "}
        {user.roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}{" "}
      </ul>
    );

    return (
      <div className="row row-user">
        <div className="body-user mr-1">
          {user.name} {user.lastName}
        </div>
        <div className="body-user center">{userRolesList}</div>
        <div className="body-user center">
          <button onClick={handleEdit}>
            <Unicons.UilEdit color="#000000" />
          </button>
        </div>
      </div>
    );
  } else return null;
};

/* <tr className="table__row user">
<td className={`table__cell table__user`}>
  {user.name} {user.lastName}
</td>
<td className={`table__cell table__roles`}>
  {userRolesList}
</td>
<td className={`table__cell table__edit`}>
  <button className="icon-button table__button" onClick={handleEdit}>
    <Unicons.UilEdit color="#000000" />
  </button>
</td>
</tr> */

const memoizedUser = memo(User);

export default memoizedUser;
