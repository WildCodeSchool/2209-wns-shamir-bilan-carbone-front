import { GETALL_USERS } from "../../gql/queries";
import { GETALL_RECIPES } from "../../gql/queries";
import { useQuery } from "@apollo/client";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Recipe {
  id: string;
  name: string;
  description: string;
  calcul: string;
}

const Profile = () => {
  // const { data, loading, error } = useQuery(GETALL_USERS);
  const { data, loading, error } = useQuery(GETALL_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  console.log(data);

  return (
    <div>
      <p>MES RECETTES</p>
      {/* {data.getAllUsers.map((user: User) => (
        <p key={user.id}>{user.email}</p>
      ))} */}

      {data.getAllRecipes.map((recipe: Recipe) => (
        <p key={recipe.id}>
          {recipe.name} <span>{recipe.description}</span>
          <span>{recipe.calcul}</span>
        </p>
      ))}
    </div>
  );
};
export default Profile;
