import React, { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setUser } = React.useContext(UserContext);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="nishanth.redde@gmail.com"
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:5001/api/v1/users/signin",
                  {
                    username,
                    password,
                  }
                );

                const { user } = response.data;

                setUser({
                  email: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  isAuthenticated: true,
                });

                localStorage.setItem("token", response.data.data.token);

                navigate("/dashboard");
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
