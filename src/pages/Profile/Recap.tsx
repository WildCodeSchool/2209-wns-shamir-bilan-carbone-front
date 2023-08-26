import { GETALL_CONS } from "../../gql/queries";
import { GET_RECIPES_BY_IDS } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { useParams, useLocation } from "react-router-dom";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import RecipeList from "../../components/Profile/RecipeList";

interface ConsumptionData {
  x: Date;
  y: number;
}

const Recap = () => {
  const { userId } = useParams<{ userId: any }>();

  // Parse the selectedRecipes parameter from the URL to get names of all selected recipes because I want to display them in Recap.
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedRecipesParam = queryParams.get("selectedRecipes");
  const selectedRecipes = selectedRecipesParam
    ? selectedRecipesParam.split(",")
    : [];
  console.log("printSelectedRecipes", selectedRecipes);
  const selectedRecipeIds = [];
  for (let i = 0; i < selectedRecipes.length; i++) {
    const recipeId = parseInt(selectedRecipes[i]);
    if (!isNaN(recipeId)) {
      selectedRecipeIds.push(recipeId);
    }
  }

  const { loading, error, data } = useQuery(GETALL_CONS, {
    variables: { userId: parseInt(userId) },
  });
  console.log("dataConsomation:", data);
  console.log("userId:", userId);

  const {
    data: recipeData,
    loading: recipeLoading,
    error: recipeError,
  } = useQuery(GET_RECIPES_BY_IDS, {
    variables: { input: { ids: selectedRecipeIds } },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (recipeError) {
    return <div>Error occurred.</div>;
  }

  // new code
  let totalCalculation = 0;
  if (recipeData) {
    totalCalculation = recipeData.getRecipesByIds.reduce(
      (total: any, recipe: any) => {
        // Assuming "calcul" is a numeric property, parse and add it to the total
        const numericValue = parseFloat(recipe.calcul);
        return isNaN(numericValue) ? total : total + numericValue;
      },
      0
    );
  }
  // end new code

  let consumptionData: ConsumptionData[] = [];
  if (data && data.getConsByUser) {
    consumptionData = data.getConsByUser.map((consumption: any) => ({
      x: new Date(consumption.createdAt),
      y: parseFloat(consumption.empreinte),
    }));

    console.log("thisUserConsumptionData", consumptionData);
  }

  // const customTickFormat = (tick: any) => {
  //   return tick.toFixed(2);
  // };

  const minDate =
    consumptionData.length > 0 ? consumptionData[0].x : new Date();
  const maxDate =
    consumptionData.length > 0
      ? consumptionData[consumptionData.length - 1].x
      : new Date();

  return (
    <div className={"recapPage container"}>
      {/* {data && data.getConsByUser && (
        <ul>
          {data.getConsByUser.map((consumption: any) => (
            <li key={consumption.id}>
              {consumption.description} - {consumption.empreinte} -
              {consumption.createdAt}
            </li>
          ))}
        </ul>
      )} */}

      {recipeData && (
        <RecipeList
          recipeData={recipeData.getRecipesByIds}
          totalCalculation={totalCalculation}
        />
      )}

      {data && data.getConsByUser && (
        <div className={"chart-container"}>
          <h2>Votre graphique hebdomadaire</h2>
          <VictoryChart
            height={200}
            width={800}
            scale={{ x: "time", y: "linear" }}
            domain={{
              // x: [new Date("2023-05-01"), new Date("2023-06-30")],
              x: [minDate, maxDate],
              y: [0, 10],
            }}
          >
            <VictoryAxis tickFormat={(date) => date.toLocaleDateString()} />
            <VictoryAxis dependentAxis />
            <VictoryLine data={consumptionData} />
          </VictoryChart>
        </div>
      )}
    </div>
  );
};
export default Recap;
