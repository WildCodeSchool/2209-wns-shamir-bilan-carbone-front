import { useState } from "react";
import { Form, Col, Button, Badge, InputGroup } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

type Props = {
  users: number;
  handleClickUser: any;
};

const SearchField = ({ users, handleClickUser }: Props) => {
  return (
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
        <Form.Control
          placeholder="Utilisateur"
          aria-label="Recettes"
          aria-describedby="basic-addon2"
        />

        <Badge bg="secondary" className="">
          {users}
        </Badge>
      </InputGroup>
      <Button
        // href="/"
        variant="outline-success"
        className={"btn-admin-small "}
        onClick={handleClickUser}
      >
        +
      </Button>
    </Col>
  );
};

export default SearchField;
