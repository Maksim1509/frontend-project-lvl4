import React from 'react';
import faker from 'faker';
import Cookies from 'js-cookie';

const getUserName = () => {
  const currentUserName = Cookies.get('userName');
  if (currentUserName) {
    return currentUserName;
  }
  const newUserName = faker.name.findName();
  Cookies.set('userName', newUserName);
  return newUserName;
};

export const userName = getUserName();

export const UserNameContext = React.createContext('User name');
