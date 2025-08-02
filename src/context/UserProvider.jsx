import { useEffect, useState } from "react";
import { getCurrentUser, isLoggedIn } from "../auth/Index";
import UserContext from "./UserContext";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    data: {},
    login: false,
  });

  useEffect(() => {
    setUser({
      data: getCurrentUser(),
      login: isLoggedIn(),
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;