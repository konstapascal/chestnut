
import React from 'react';
import { useParams } from 'react-router-dom';

import KeyList from '../components/KeyList';

const Keys = [
  {
    id: '1',
    title: 'My first Key',
    type: 'RSA',
    length: 512,


    userId: '1'
  },
  {
    id: '2',
    title: 'My second Key',
    type: 'RSA',
    length: 1024,


    userId: '1'
  }

];

const UserKeys = () => {
  const userId = useParams().userId;
  const LoadedKeys = Keys.filter(key => key.userId === userId);
  return <KeyList items={LoadedKeys} />;
};

export default UserKeys;
