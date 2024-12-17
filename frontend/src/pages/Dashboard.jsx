import { useEffect, useState } from "react";
import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const [balance, setBalance] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const token = useToken();

  useEffect(() => {
    if (!token) return;

    console.log("fetching profile");

    async function fetchProfile() {
      setIsLoading(true);

      const response = await axios.get("http://localhost:5001/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.data.user);

      setIsLoading(false);
    }

    fetchProfile();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    console.log("Fetching balance");

    async function fetchBalance() {
      setIsLoading(true);

      const response = await axios.get(
        "http://localhost:5001/api/v1/accounts/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userBalance = response.data.data.balance;

      setBalance(userBalance);

      setIsLoading(false);
    }

    fetchBalance();
  }, [token]);

  if (isLoading) return <div>Loading..</div>;

  return (
    <div>
      <Appbar user={user.firstName}/>
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;