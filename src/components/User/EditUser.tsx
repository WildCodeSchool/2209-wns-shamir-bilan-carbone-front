import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}

interface Props {
  userInfo: IUser;
  handleUpdateUser: (
    id: number,
    firstName: string,
    lastName: string
  ) => Promise<void>;
}

const EditUser = ({
  firstNamePayload,
  lastNamePayload,
  userInfo,
  handleUpdateUser,
}: any | Props) => {
  const [firstName, setFirstName] = useState(firstNamePayload);
  const [lastName, setLastName] = useState(lastNamePayload);

  const handleFirstNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModify = async () => {
    await handleUpdateUser(firstName, lastName);
    setFirstName("");
    setLastName("");
    handleClose();
  };

  return (
    <>
      <div onClick={handleShow}>Parameters</div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier mon profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="editmodal" className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="name"
                >
                  Prenom
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChanged}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="lastname"
                >
                  Nom
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="lastname"
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChanged}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <button
            form="editmodal"
            className="btn btn-success"
            onClick={handleModify}
          >
            Modifier
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
