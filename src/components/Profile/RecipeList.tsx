import React from "react";

interface Recipe {
  id: number;
  name: string;
  calcul: string;
}

interface RecipeListProps {
  recipeData: Recipe[];
  totalCalculation: number;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipeData,
  totalCalculation,
}) => {
  return (
    <div className={"choiceList"}>
      <h2>
        Vous avez choisi
        {recipeData.map((recipe) => (
          <div key={recipe.id}>
            <span>"{recipe.name}"</span>
            {/* <p>{recipe.calcul}</p> */}
          </div>
        ))}
        pour votre repas aujourd'hui.
      </h2>
      <h3>
        Empreinte carbone totale:{" "}
        <span className={"co2"}>{totalCalculation}</span>
      </h3>
    </div>
  );
};

export default RecipeList;
