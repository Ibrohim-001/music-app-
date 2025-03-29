import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  async function getUser(userData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  useEffect(() => {
    localStorage.getItem("auth") ? navigate("/") : console.log("ok");
  }, []);
  function putUser(userData) {
    localStorage.setItem("auth", JSON.stringify(userData));
    navigate("/");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      id: `${username}${password}1`,
      username: username,
      email: login,
      password: password,
      likedSongs: [],
    };

    setData(userData);
    getUser(userData);
    putUser(userData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex rounded-md flex-col items-center h-[400px] justify-center border p-10 max-w-[400px] mx-auto"
    >
      <div>
        <Label className="text-2xl mt-2">Name</Label>
        <Input
          onChange={(e) => setName(e.target.value)}
          className="w-[300px] mt-3"
          placeholder="John"
          value={username}
        />
      </div>
      <div>
        <Label className="text-2xl mt-2">Login</Label>
        <Input
          onChange={(e) => setLogin(e.target.value)}
          className="w-[300px] mt-3"
          placeholder="example@gmail.com"
          value={login}
        />
      </div>
      <div className="mt-2">
        <Label className="text-2xl mt-10">Password</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-[300px] mt-3"
          placeholder="password123"
          value={password}
        />
      </div>
      <button
        type="submit"
        className="bg-black rounded text-white w-full py-2 mt-10"
      >
        Submit
      </button>
    </form>
  );
}

export default SignUp;
