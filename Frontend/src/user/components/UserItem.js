import React from "react";
import { Link } from "react-router-dom";


import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        {/* Link wraps anchor tags, block navigation logic */}
        <Link to={`/${props.id}/keys`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.keyCount} {props.keyCount === 1 ? "Key" : "Keys"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
