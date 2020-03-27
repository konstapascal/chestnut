import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./KeyItem.css";

const KeyItem = props => {
  const auth = useContext(AuthContext);

  const [showConfimModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("deleted");
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfimModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p> Do you want to delete this key? </p>
      </Modal>
      <li className="key-item">
        <Card className="key-item__content">
          <div className="key-item__info">
            <h2>{props.title}</h2>
            <h4>Type: {props.type}</h4>
            <h4>Length: {props.length}</h4>
          </div>
          <div className="key-item__actions">
            
           {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>
              Delete
            </Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default KeyItem;
