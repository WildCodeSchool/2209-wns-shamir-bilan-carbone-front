import { GETALL_USERS } from "../../gql/queries";
import { useQuery } from "@apollo/client";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

const Profile = () => {
  const { data, loading, error } = useQuery(GETALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  console.log(data);

  return (
    <div>
      <p>Mon Profil</p>
      {data.getAllUsers.map((user: User) => (
        <p key={user.id}>{user.email}</p>
      ))}
    </div>
  );
};
export default Profile;
