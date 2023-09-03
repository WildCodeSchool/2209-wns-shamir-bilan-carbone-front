import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import SearchField from "../../components/SearchField";
import CreateRecipeForm from "../../components/AdminForms/CreateRecipeForm";
import { GETALL_RECIPES } from "../../gql/queries";
import { GETALL_USERS } from "../../gql/queries";
import { DELETE_USER } from "../../gql/mutations";
import jwtDecode from "jwt-decode";
import { useRecipes } from "../../context/recipesContext";

interface Recipe {
  id: string;
  name: string;
  description: string;
  calcul: string;
}

interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

const Admin = () => {
  // Check if has role Admin to access page /admin
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // new
  const { refetch: refetchRecipes } = useQuery(GETALL_RECIPES);
  const { refetch: refetchUsers } = useQuery(GETALL_USERS);

  const { recipes } = useRecipes();
  // const { recipes, addRecipe, deleteRecipeWithTimeout } = useRecipeContext();
  // endnew

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginreal");
    } else {
      const decodedToken = jwtDecode(token) as { role: string };
      setUserRole(decodedToken.role);
      if (decodedToken.role !== "ADMIN") {
        navigate("/");
      }
    }

    refetchRecipes();
    refetchUsers();
  }, []);

  const {
    data: recipeData,
    loading: recipeLoading,
    error: recipeError,
  } = useQuery(GETALL_RECIPES);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GETALL_USERS);

  const [isShownRecipeForm, setIsShownRecipeForm] = useState(false);
  const [isShownUserForm, setIsShownUserForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | any>();
  const [selectedUser, setSelectedUser] = useState<User | any>();
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const [titleText, setTitleText] = useState("Titre");
  const [descriptionText, setDescriptionText] = useState("Description");
  const [co2Text, setCo2Text] = useState("0.00");
  const [randomImg, setRandomImg] = useState(getRandomNumber());

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleText(event.target.value);
  };

  const handleClickRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isShownRecipeForm) {
      setSelectedRecipe(undefined);
    }
    setIsShownRecipeForm((current: boolean) => !current);
    // setIsShown(true);
    // setIsShownRecipeForm((current: boolean) => !current);
  };
  const handleClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsShownUserForm((current: boolean) => !current);
  };

  const placeholderUser = "Utilisateur";
  const placeholderRecipe = "Recette";

  const handleSelectChangeRecipe = (selectedRecipe: Recipe) => {
    if (selectedRecipe) {
      setSelectedRecipe(selectedRecipe);
    }
  };

  const handleSelectChangeUser = (selectedUser: User) => {
    if (selectedUser) {
      setSelectedUser(selectedUser);
    }
  };

  const [deleteUser, {}] = useMutation(DELETE_USER);
  const handleDeleteUser = (email: string) => {
    console.log("I will delete");
    deleteUser({
      variables: { email },
      refetchQueries: [{ query: GETALL_USERS }],
    });
    setSelectedUser(undefined);
    setShowDeleteButton(false);
  };

  // const handleClickUser = (
  //   selectedUser: User,
  //   deleteUser: (email: string) => void
  // ) => {
  //   setShowDeleteButton(true);
  //   setSelectedUser(selectedUser);
  // };

  if (recipeLoading || userLoading) return <p>Loading...</p>;
  if (recipeError || userError) return <p>Error...</p>;

  const recipeOptions = recipeData.getAllRecipes.map((recipe: Recipe) => ({
    value: recipe.id,
    label: recipe.name,
  }));

  const userOptions = userData.getAllUsers.map((user: User) => ({
    value: user.id,
    label: user.firstName + " " + user.lastName,
    email: user.email,
  }));

  let sumUsers = userOptions.length;
  let sumRecipes = recipeOptions.length;

  function getRandomNumber() {
    const randomDecimal = Math.random();
    const min = 1;
    const max = 16;
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
    return randomNumber;
  }

  return (
    <Container id={"adminPage"}>
      <Row className={"text-center mt-5"}>
        {/* User Search Field */}
        <SearchField
          number={sumUsers}
          handleClick={handleClickUser}
          ph={placeholderUser}
          options={userOptions}
          selectedOption={selectedUser}
          handleSelectChange={handleSelectChangeUser}
        />

        <Col
          className={
            "d-flex justify-content-left align-items-center my-2 col-12 col-lg-6 "
          }
        >
          <div className={"select-wrapp"}>
            <p className={"mb-0 select-element"}>{selectedUser?.label}</p>
          </div>

          {/* {showDeleteButton && selectedUser && ( */}

          <div className="admin-btn-wrapp">
            <Button
              id={"deleteBtn"}
              variant="outline-danger"
              className={"btn-admin-small me-1 "}
              onClick={() => handleDeleteUser(selectedUser.email)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
              </svg>
            </Button>
            {/* )} */}
            <Button
              href="/"
              variant="outline-warning"
              className={"btn-admin-small mx-1 "}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </Button>
          </div>
        </Col>

        {/* Recipe Search Field */}
        <SearchField
          number={sumRecipes}
          handleClick={handleClickRecipe}
          ph={placeholderRecipe}
          options={recipeOptions}
          selectedOption={selectedRecipe}
          handleSelectChange={handleSelectChangeRecipe}
        />

        {/* Selected Option of Recipe Search Field */}
        <Col
          className={
            "d-flex justify-content-center align-items-center my-2 col-12 col-lg-6"
          }
        >
          <div className={"select-wrapp"}>
            <p className={"mb-0 select-element"}>{selectedRecipe?.label}</p>
          </div>

          <div className="admin-btn-wrapp">
            <Button
              href="/"
              variant="outline-danger"
              className={"btn-admin-small me-1 "}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
              </svg>
            </Button>
            <Button
              href="/"
              variant="outline-warning"
              className={"btn-admin-small mx-1 "}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </Button>
          </div>
        </Col>
      </Row>

      {/* new code */}
      <div className="recipes-admin-container">
        {recipes.map((recipe: Recipe) => (
          <div key={recipe.id}>
            <h5>
              {" "}
              La recette <span>{recipe.name} </span> est ajoutée. La valeur du
              CO2:
              <span className={"carbon-value"}>{recipe.calcul} </span>
            </h5>
          </div>
        ))}
      </div>
      {/* end new code */}

      {isShownRecipeForm && (
        <Container className={"show mt-3 create-container"}>
          <Row className={" mt-5"}>
            <h2>Créer une recette</h2>
            <Col className={"col-12 col-lg-6 "}>
              <CreateRecipeForm
                onTitleChange={setTitleText}
                onDescriptionChange={setDescriptionText}
                onCo2Change={setCo2Text}
              />
            </Col>

            <Col
              className={
                "d-flex justify-content-left align-items-center my-2 col-12 col-lg-6"
              }
            >
              {/* Display Recipe In Process */}
              <Container className={"recipe-preview"}>
                <h4>{titleText}</h4>
                <p>{descriptionText}</p>
                <h5>CO²: {co2Text} </h5>
                <img
                  src={`/assets/meals/food${randomImg}.jpg`}
                  alt="Recipe example image"
                />
              </Container>
            </Col>
          </Row>
        </Container>
      )}

      {isShownUserForm && (
        <Container className={"show mt-5"}>
          <h2>Créer un nouvel utilisateur</h2>
          {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Créer utilisateur
            </Button>
          </Form> */}
        </Container>
      )}
    </Container>
  );
};

export default Admin;
