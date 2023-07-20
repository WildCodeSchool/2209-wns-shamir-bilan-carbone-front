import { useState } from "react";
import { GETALL_RECIPES } from "../../gql/queries";
import { GET_USER_BY_EMAIL } from "../../gql/queries";
import { CREATE_CONSUMPTION } from "../../gql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
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
  const authToken = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
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
  console.log("fetched-recipe-data", data);

  const handleCheckboxChange = (recipeId: string) => {
    console.log("recipeId:", typeof recipeId);
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

      console.log("Consumption created:", data.createConsumptionWithRecipeUser);
      if (data.createConsumptionWithRecipeUser) {
        navigate(`/profile/recap/${userId}`);
      }
      // Handle the response from the backend, e.g.,  notification or navigate to a new page
    } catch (error) {
      console.error("Error creating consumption:", error);
    }

    console.log("selectedRecipes", selectedRecipes);
  };

  return (
    <div id={"profilePage"} className="recipes-container container">
      {data?.getAllRecipes.map((recipe: Recipe) => {
        console.log(selectedRecipes.includes(recipe.id), typeof recipe.id);
        return (
          <div className="recipe-card" key={recipe.id}>
            <h4>{recipe.name} </h4>
            <p>{recipe.description}</p>
            {/* <img src="https://picsum.photos/200/200" alt={recipe.name} /> */}
            <img
              src="https://www.bettybossi.ch/rdbimg/bb_mcco170508_0010a/bb_mcco170508_0010a_r01_v005_x0010.jpg"
              alt={recipe.name}
            />

            <h5>
              <span className="carbone">CO2:</span> {recipe.calcul}
            </h5>
            <input
              type="checkbox"
              className="checkbox-recipe"
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
  );
};
export default Profile;
