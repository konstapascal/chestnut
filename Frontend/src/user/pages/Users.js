import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  //TODO fetching users from db
  const USERS = [
    {
      id: 1,
      name: "Jack",
      image:
        "https://images.pexels.com/photos/220320/pexels-photo-220320.jpeg?cs=srgb&dl=art-artistic-bright-color-220320.jpg&fm=jpg",
      keys: 2
    }
  ];
  return <UsersList items={USERS}/>;
};
export default Users;
