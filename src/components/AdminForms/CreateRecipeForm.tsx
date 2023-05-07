import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { GETALL_ALIMENTS } from "../../gql/queries";
import { CREATE_RECIPE } from "../../gql/mutations";
import { useNavigate } from "react-router-dom";

interface AgribalyseData {
  id: number;
  name: string;
  empreinte: string;
}

interface CreateRecipeFormProps {
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onCo2Change: (co2: any) => void;
}

// export default function CreateRecipeForm() {
const CreateRecipeForm = (props: any) => {
  const animatedComponents = makeAnimated();
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GETALL_ALIMENTS);

  const [selectedAliments, setSelectedAliments] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [calculEmpreinte, setCalculEmpreinte] = useState("");

  useEffect(() => {
    let empreinteSum = 0;
    if (selectedAliments.length > 0) {
      for (let aliment of selectedAliments) {
        const alimentToConsider = alimentOptions.find(
          (item: any) => item.value === aliment
        );

        empreinteSum += parseFloat(alimentToConsider.empreinte);
      }
      setCalculEmpreinte((Math.floor(empreinteSum * 100) / 100).toString());
      props.onCo2Change((Math.floor(empreinteSum * 100) / 100).toString());
    }
  }, [selectedAliments]);

  console.log("calculEmpreint", calculEmpreinte);

  // added this code snip to save selected aliment options and pass them to 'create recipe'.
  const handleAlimentSelect = (selectedOptions: any) => {
    const selectedAlimentIds = selectedOptions.map(
      (option: any) => option.value
    );
    setSelectedAliments(selectedAlimentIds);
    // props.onCo2Change(selectedAlimentIds);
  };

  const navigate = useNavigate();
  const [createRecipe, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_RECIPE, {
      onCompleted: (mutationData) => {
        if (mutationData.createRecipe) {
          navigate("/");
        }
      },
    });

  const handleCreateRecipe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const agribalyseIds = selectedAliments;
    createRecipe({
      variables: {
        name,
        description,
        empreinte: calculEmpreinte,
        agribalyseIds,
      },
    });
  };

  if (queryLoading || mutationLoading) return <p>Loading...</p>;
  console.log(mutationError);
  if (queryError || mutationError) return <p>Error...</p>;

  const alimentOptions = queryData.getAllAliments.map(
    (aliment: AgribalyseData) => ({
      value: aliment.id,
      label: aliment.name,
      empreinte: aliment.empreinte,
    })
  );

  console.log("alimentOptions", alimentOptions);

  return (
    <Form onSubmit={handleCreateRecipe} className={"createRecipeForm"}>
      <Form.Group className="mb-3">
        <Form.Label>Titre</Form.Label>
        <Form.Control
          type="text"
          placeholder="titre"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            props.onTitleChange(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            props.onDescriptionChange(e.target.value);
          }}
        />
      </Form.Group>
      <Select
        className={"mb-3"}
        closeMenuOnSelect={false}
        components={animatedComponents}
        // preselected options
        // defaultValue={[alimentOptions[2], alimentOptions[3]]}
        isMulti
        options={alimentOptions}
        onChange={handleAlimentSelect}
      />
      <Button variant="success" type="submit">
        Créer recette
      </Button>
    </Form>
  );
};

export default CreateRecipeForm;
