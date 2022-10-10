import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import * as Unicons from "@iconscout/react-unicons";

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const email = user.email;
  const [roles, setRoles] = useState(user.roles);

  useEffect(() => {
    
    if (isSuccess || isDelSuccess) {
      setRoles([]);
      navigate("/dash/usuarios");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onRolesChanged = (e) => {
    if (e.target.checked) {
      let newRoles = [...roles];
      newRoles.push(e.target.value);
      setRoles(newRoles);
    } else {
      let newRoles = [...roles];
      let deleteIdx = newRoles.indexOf(e.target.value)
      newRoles.splice(deleteIdx, 1)
      setRoles(newRoles)
    }
  };

  const onSaveUserClicked = async (e) => {
    await updateUser({ id: user.id, email, roles }); //active
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const Checkbox = ({ initialState, id, onChange, value }) => {
    const [checked, setChecked] = useState(initialState);
    const onClick = (checked) => {
      setChecked(checked);
      /* onChange(id, checked); */
    };
    return (
      <input
        type="checkbox"
        onClick={(e) => onClick(e.target.checked)}
        checked={checked}
        value={value}
        onChange={onChange}
      />
    );
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <div className="role-checkbox" key={role}>
        <Checkbox 
          initialState={roles.includes(role) ? true : false} 
          id={`role-${role}`}
          value={role}
          onChange={onRolesChanged}
        />
        <label htmlFor={`role-${role}`} key={role}>
          {role}
        </label>
      </div>
    );
  });

  let canSave = roles.length && !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="user__box" onSubmit={(e) => e.preventDefault()}>
        <div className="data-user">
          <div className="data-name">
            <h3>
              {user.name} {user.lastName}
            </h3>
          </div>
          <div className="data-email">
            {/* <p>Email: </p> */}
            <h3>{user.email}</h3>
          </div>
          <div className="data-permitions">
            <label htmlFor="roles">Permisos:</label>
            <div className="data-roles">{options}</div>
          </div>
          <div className="data-actions">
            <button
              className="icon-button"
              title="Guardar cambios"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <Unicons.UilSave color="#000000" />
            </button>
            <button
              className="icon-button"
              title="Eliminar usuario"
              onClick={onDeleteUserClicked}
            >
              <Unicons.UilTrash color="#000000" />
            </button>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditUserForm;
