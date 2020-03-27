import React from "react";

import Card from "../../shared/components/UIElements/Card";
import KeyItem from "../components/KeyItem";

import './KeyList.css';

const UserKeys = props => {
  if (props.items.length === 0) {
    return (
      <div className="key-list center">
        <Card>
          <h2>No keys found. Generate a new one</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="key-list">
      {props.items.map(key => (
        <KeyItem
          key={key.id}
          id={key.id}
          title={key.title}
          type={key.type}
          length={key.length}
        />
      ))}
    </ul>
  );
};

export default UserKeys;