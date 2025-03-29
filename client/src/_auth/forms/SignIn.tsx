import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function SignIn() {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  async function CheckAdmin() {
    try {
      let response = (await axios("http://localhost:3000/admin")).data;
      response.map((item) => {
        if (item.email == login && item.password == password) {
          navigate("/admin12345678");
        }
      });
    } catch (error) {}
  }
  async function getUser() {
    let response = await axios(`http://localhost:3000/users?email=${login}`);
    setData(response.data);
    console.log(data);
  }
  const goHome = () => {
    navigate("/");
    localStorage.setItem("auth", JSON.stringify(data));
  };
  useEffect(() => {
    localStorage.getItem("auth") ? navigate("/") : console.log("ok");
  }, []);
  async function checkPassowrd() {
    data[0].password == password ? goHome() : alert("Invalid password");
  }
  return (
    <>
      <form className="flex rounded-md flex-col items-center h-[300px] justify-center border p-10 max-w-[400px] mx-auto">
        <div>
          <Label className="text-2xl mt-2">Login</Label>
          <Input
            onChange={(e) => setLogin(e.target.value)}
            className="w-[300px] mt-3"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mt-2">
          <Label className="text-2xl mt-10">Password</Label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[300px] mt-3"
            placeholder="password123"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault(), getUser(), checkPassowrd();
          }}
          className="bg-black rounded text-white w-full py-2 mt-10"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default SignIn;
