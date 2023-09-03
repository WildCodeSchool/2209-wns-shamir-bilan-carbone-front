import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Recipe {
  id: string;
  name: string;
  description: string;
  calcul: string;
}

interface RecipesContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  addRecipe: (recipe: Recipe) => void;
  deleteRecipeWithTimeout: (recipeId: string, timeout: number) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Function to add a recipe
  const addRecipe = (recipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipe]);
  };

  // Function to delete a recipe with a timeout
  const deleteRecipeWithTimeout = (recipeId: string, timeout: number) => {
    setTimeout(() => {
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    }, timeout);
  };

  return (
    <RecipesContext.Provider
      value={{ recipes, setRecipes, addRecipe, deleteRecipeWithTimeout }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes(): RecipesContextType {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
}
