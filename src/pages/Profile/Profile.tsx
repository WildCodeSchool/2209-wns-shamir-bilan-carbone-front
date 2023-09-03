import { useState } from "react";
import { GETALL_RECIPES } from "../../gql/queries";
import { GET_USER_BY_EMAIL } from "../../gql/queries";
import { CREATE_CONSUMPTION } from "../../gql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../../context/recipesContext";

// import IUser from "../../interfaces/IUser";

// interface User {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
// }

interface Recipe {
  id: string;
  name: string;
  description: string;
  calcul: string;
}

const Profile = () => {
  const authToken = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));

  // new
  const { recipes } = useRecipes();
  //end new

  let userEmail = "";
  const navigate = useNavigate();
  if (authToken) {
    const tokenPayload: any = jwtDecode(authToken);
    if (tokenPayload) {
      userEmail = tokenPayload.email;
    }
  }

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_BY_EMAIL, { variables: { email: userEmail } });

  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const { data, loading, error } = useQuery(GETALL_RECIPES);
  const [createConsumption] = useMutation(CREATE_CONSUMPTION);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error fetching recipes...</p>;
  if (userLoading) return <p>Loading user...</p>;
  if (userError) return <p>Error fetching user...</p>;

  console.log("fetched-recipe-data", data);

  const handleCheckboxChange = (recipeId: string) => {
    // Check if the recipe is already selected, and update the selectedRecipes state accordingly
    const isSelected = selectedRecipes.includes(recipeId);
    if (isSelected) {
      setSelectedRecipes(selectedRecipes.filter((id) => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  console.log("selectedRecipes out", selectedRecipes);

  const handleSubmitChecked = async () => {
    try {
      // Prepare variables for the mutation
      const userId = Number(userData.findUserByEmail.id); // Replace with the actual user ID
      const createdAt = new Date().toISOString();
      const description = "ma consommation quotidienne";
      const empreinte = "5"; // Replace with the actual empreinte
      const recipeIds = selectedRecipes;

      // Make the mutation request to create a consumption record
      const { data } = await createConsumption({
        variables: {
          userId,
          recipeIds,
          createdAt,
          description,
          empreinte,
        },
      });

      console.log("wanttoknowdata", data.createConsumptionWithRecipeUser);

      console.log("Consumption created:", data.createConsumptionWithRecipeUser);
      if (data.createConsumptionWithRecipeUser) {
        // navigate(`/profile/recap/${userId}`);
        navigate(
          `/profile/recap/${userId}?selectedRecipes=${selectedRecipes.join(
            ","
          )}`
        );
      }
      // Handle the response from the backend, e.g.,  notification or navigate to a new page
    } catch (error) {
      console.error("Error creating consumption:", error);
    }

    console.log("selectedRecipes", selectedRecipes);
  };

  function getRandomNumber() {
    const randomDecimal = Math.random();
    const min = 1;
    const max = 16;
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
    return randomNumber;
  }

  return (
    <div id={"profilePage"} className="container">
      <h1>
        Bienvenue à Just Reduce, où chaque inscription contribue à un avenir
        plus vert et plus durable !
      </h1>
      <h2>Choisissez les recettes d'aujourd'hui</h2>

      <div className="recipes-container">
        {data?.getAllRecipes.map((recipe: Recipe) => {
          const randomImg = getRandomNumber();
          // console.log(selectedRecipes.includes(recipe.id), typeof recipe.id);
          return (
            <div className="recipe-card" key={recipe.id}>
              <div className={"recipe-image-wrap"}>
                <img
                  src={`/assets/meals/food${randomImg}.jpg`}
                  alt={recipe.name}
                />
              </div>
              <h4>{recipe.name} </h4>
              {/* <p>{recipe.description}</p> */}
              <h5>
                <span className="carbone">CO2:</span> {recipe.calcul}
              </h5>
              <input
                type="checkbox"
                className="checkbox-recipe custom-checkbox"
                checked={selectedRecipes.includes(recipe.id)}
                onChange={() => handleCheckboxChange(recipe.id)}
              />
            </div>
          );
        })}
        <button className="submit-button" onClick={handleSubmitChecked}>
          Sauvegarder
        </button>
      </div>

      {/* new code */}
      <div className="recipes-admin-container">
        {recipes.map((recipe: Recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <h4>{recipe.name} </h4>
          </div>
        ))}
      </div>
      {/* end new code */}
    </div>
  );
};
export default Profile;
