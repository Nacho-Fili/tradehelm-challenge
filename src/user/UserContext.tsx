import React, {createContext, useState} from "react";

import {User} from "./types";
import userService from "./userService";

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<User>({id: -1});

export const UserContextProvider: React.FC<Props> = ({children}) => {
  const id: number = Number.parseInt(localStorage.getItem("userId") || "-1");
  const [userLogged, setUserLogged] = useState<User>({id});

  if (id === -1)
    userService.createUser().then((user: User) => {
      setUserLogged(user);
      localStorage.setItem("userId", String(user.id));
    });

  return <UserContext.Provider value={userLogged}>{children}</UserContext.Provider>;
};

export default UserContext;
