import { useState } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Badge,
  InputGroup,
} from "react-bootstrap";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import SearchField from "../../components/SearchField";
import CreateRecipeForm from "../../components/AdminForms/CreateRecipeForm";
import { GETALL_RECIPES } from "../../gql/queries";

interface Recipe {
  id: string;
  name: string;
  description: string;
  calcul: string;
}

const Admin = () => {
  let users = 10;
  const { data, loading, error } = useQuery(GETALL_RECIPES);
  const [isShownRecipe, setIsShownRecipe] = useState(false);
  const [isShownUser, setIsShownUser] = useState(false);
  const handleClickRecipe = (event: any) => {
    // setIsShown(true);
    setIsShownRecipe((current: boolean) => !current);
  };
  const handleClickUser = (event: any) => {
    setIsShownUser((current: boolean) => !current);
  };

  const [selectedRecipe, setSelectedRecipe] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const recipeOptions = data.getAllRecipes.map((recipe: Recipe) => ({
    value: recipe.id,
    label: recipe.name,
  }));

  return (
    <Container>
      <Row className={"text-center mt-5"}>
        {/* USer Search Field */}
        <SearchField users={users} handleClickUser={handleClickUser} />
        <Col
          className={
            "d-flex justify-content-center align-items-center my-2 col-12 col-lg-6"
          }
        >
          <p className={"mb-0"}>Selected User</p>
          <Button
            // href="/"
            variant="outline-danger"
            className={"btn-admin-small mx-1 "}
            onClick={handleClickRecipe}
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
        </Col>

        {/* Recipe Search Field */}
        <Col
          className={
            "d-flex justify-content-center align-items-center my-2 col-12 col-lg-6"
          }
        >
          <InputGroup className="me-1 ">
            <Button variant="outline-secondary" id="button-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={"bi bi-search left"}
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </Button>
            {/* <Form.Control
              placeholder="Recette"
              aria-label="Recettes"
              aria-describedby="basic-addon2"
            /> */}
            <Select
              // components={animatedComponents}
              options={recipeOptions}
              value={selectedRecipe}
              // onChange={(selectedOption) => setSelectedRecipe(selectedOption)}
              placeholder="Recette"
              className={"select-w"}
            />

            <Badge bg="secondary" className="">
              {/* {recipes} */}
              {data.getAllRecipes.length}
            </Badge>
          </InputGroup>
          <Button
            // href="/"
            variant="outline-success"
            className={"btn-admin-small "}
            onClick={handleClickRecipe}
          >
            +
          </Button>
        </Col>

        <Col
          className={
            "d-flex justify-content-center align-items-center my-2 col-12 col-lg-6"
          }
        >
          <p className={"mb-0"}>Selected Recipe</p>
          <Button
            href="/"
            variant="outline-danger"
            className={"btn-admin-small mx-1 "}
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
        </Col>
      </Row>

      {/* list of all recipes. */}
      {/* {data.getAllRecipes.map((recipe: Recipe) => (
        <p key={recipe.id}>
          {recipe.name} <span>{recipe.description}</span>
          <span>{recipe.calcul}</span>
        </p>
      ))} */}

      {isShownRecipe && (
        <Container className={"show mt-5"}>
          <h2>Créer une recette</h2>
          <CreateRecipeForm />
        </Container>
      )}

      {isShownUser && (
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
