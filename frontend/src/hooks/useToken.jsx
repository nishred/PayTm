import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useToken() {
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");

    if (!storedToken) navigate("/signin");

    setToken(storedToken);
  }, []);

  return token;
}

export default useToken;
