import { Col, Button, Badge, InputGroup } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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

type SearchFieldProps = {
  number?: number;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ph: string;
  options: (Recipe | User)[];
  selectedOption?: Recipe | User;
  handleSelectChange: (event: any) => void;
};

const SearchField = ({
  number,
  handleClick,
  handleSelectChange,
  ph,
  options,
  selectedOption,
}: SearchFieldProps) => {
  const badge = number ? number : null;
  const animatedComponents = makeAnimated();

  return (
    <Col
      className={
        "d-flex justify-content-left align-items-center my-2 col-12 col-lg-6"
      }
    >
      <div className=" inputgroup">
        {/* <InputGroup className=" inputgroup"> */}
        <Button
          variant="outline-secondary"
          className={"input-btn-search"}
          id="button-addon1"
        >
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

        <Select
          components={animatedComponents}
          options={options}
          // defaultValue={options[0]}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder={ph}
          className={"select-w"}
          id={"test"}
        />

        <Badge bg="secondary" className="input-btn-badge">
          {badge}
        </Badge>
        {/* </InputGroup> */}
      </div>
      <div className="admin-btn-wrapp">
        <Button
          // href="/"
          variant="outline-success"
          className={"btn-admin-small "}
          onClick={handleClick}
        >
          +
        </Button>
      </div>
    </Col>
  );
};

export default SearchField;
