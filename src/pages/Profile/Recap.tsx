import { GETALL_CONS } from "../../gql/queries";
import { GET_RECIPES_BY_IDS } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { useParams, useLocation } from "react-router-dom";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";
import RecipeList from "../../components/Profile/RecipeList";

interface ConsumptionData {
  x: Date;
  y: number;
}

const Recap = () => {
  const { userId } = useParams<{ userId: any }>();

  // Parse the selectedRecipes parameter from the URL to get names of all selected recipes because I want to display them in Recap.
  //Storing selectedRecipes ids in array  selectedRecipesIds
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

  // fetching all consumption data of particular user by method which return consumptions sorted by date and storing in 'data"
  const {
    loading: consLoading,
    error: consError,
    data,
  } = useQuery(GETALL_CONS, {
    variables: { userId: parseInt(userId) },
  });
  console.log("dataConsomation:", data);

  //fetching data of recipes by ids (Ids taken from previous array - slectedRecipes)
  const {
    data: recipeData,
    loading: recipeLoading,
    error: recipeError,
  } = useQuery(GET_RECIPES_BY_IDS, {
    variables: { input: { ids: selectedRecipeIds } },
  });

  // if (consLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (recipeError) {
  //   return <div>Error occurred.</div>;
  // }

  // calculating total co2 from selected recipes, returning totalCalculation
  let totalCalculation = 0;
  if (recipeData) {
    totalCalculation = recipeData.getRecipesByIds.reduce(
      (total: any, recipe: any) => {
        const numericValue = parseFloat(recipe.calcul);
        return isNaN(numericValue) ? total : total + numericValue;
      },
      0
    );
    totalCalculation = parseFloat(totalCalculation.toFixed(1));
  }

  //if consumption data exist for user, I define new varibale CosumptionData. And the graph id design with these data.
  let consumptionData: ConsumptionData[] = [];
  if (data && data.getConsByUser) {
    console.log("what", data.getConsByUser);
    consumptionData = data.getConsByUser.map((consumption: any) => ({
      x: new Date(consumption.createdAt),
      y: parseFloat(consumption.empreinte),
    }));
    console.log("thisUserConsumptionData", consumptionData);
  }

  // const minDate =
  //   consumptionData.length > 0 ? consumptionData[0].x : new Date();
  // const maxDate =
  //   consumptionData.length > 0
  //     ? consumptionData[consumptionData.length - 1].x
  //     : new Date();

  const minDate = new Date("2023-08-25");
  const maxDate = new Date("2023-09-05");

  return (
    <div className={"recapPage container"} id={"recapPage"}>
      {/* {data && data.getConsByUser && (
        <ul>
          {data.getConsByUser.map((consumption: any) => (
            <li key={consumption.id}>
              {consumption.description} - {consumption.empreinte} -
              {consumption.createdAt}
              {consumption.id}
            </li>
          ))}
        </ul>
      )} */}

      {recipeData && recipeData.getRecipesByIds.length > 0 && (
        <RecipeList
          recipeData={recipeData.getRecipesByIds}
          totalCalculation={totalCalculation}
        />
      )}

      {data && data.getConsByUser && (
        <div className={"chart-container"}>
          <h2>Votre graphique quotidien</h2>
          <VictoryChart
            height={200}
            width={800}
            scale={{ x: "time", y: "linear" }}
            domain={{
              x: [minDate, maxDate],
              y: [0, 40],
            }}
          >
            <VictoryAxis
              tickFormat={(date) => date.toLocaleDateString()}
              style={{
                tickLabels: { fontSize: 10, padding: 5 },
              }}
              tickLabelComponent={<VictoryLabel dy={-5} />}
            />
            <VictoryAxis dependentAxis />
            <VictoryLine
              data={consumptionData}
              interpolation="cardinal"
              style={{
                data: {
                  stroke: "#32c481",
                  strokeWidth: 3,
                  strokeLinecap: "round",
                },
              }}
            />
            <VictoryLabel
              text="CO2"
              x={100}
              y={50}
              textAnchor="middle"
              style={{ fill: "#32c481", fontWeight: "bold", fontSize: 20 }}
            />
          </VictoryChart>
        </div>
      )}
    </div>
  );
};
export default Recap;
