import axios from "axios";
import React, { useEffect, useState } from "react";

export const UserContext = React.createContext();

const initialUserState = {
  email: "",
  firstName: "",
  lastName: "",
  isAuthenticated: false,
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:5001/me", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });

        const isAuth = response.data.success;

        if (isAuth) {
          const { user } = response.data.data;

          setUser({
            enail: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            isAuthenticated: true,
          });
        } else {
          setUser((prev) => {
            return { ...prev, isAuthenticated: false };
          });
        }
      } catch (err) {
        setUser((prev) => {
          return { ...prev, isAuthenticated: false };
        });
      }
    }, 1000);

    () => {
      window.clearInterval(id);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
