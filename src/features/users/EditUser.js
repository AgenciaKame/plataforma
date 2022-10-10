import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import ClipLoader from "react-spinners/ClipLoader";

const EditUser = () => {
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user)
    return (
      <div className="loading">
        <ClipLoader color={"#63c0bb"} />;
      </div>
    );

  const content = <EditUserForm user={user} />;

  return (
    <div className="edit__user">
      <h2>Datos del Usuario</h2>
      {content}
    </div>
  );
};

export default EditUser;
