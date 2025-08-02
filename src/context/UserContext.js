import { createContext } from "react";

const UserContext = createContext({
  user: {
    data: {},
    login: false,
  },
  setUser: () => {},
});

export default UserContext;