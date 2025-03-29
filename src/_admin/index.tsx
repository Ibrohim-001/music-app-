import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import AudioConverter from "@/components/shared/AudioConvertor";
import axios from "axios";

function Admin() {
  const [title, setTitle] = React.useState("");
  const [autor, setAutor] = React.useState("");
  const [link, setLink] = React.useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("auth")) {
  //     navigate("/");
  //     console.log("asdf");
  //   } else {
  //     let res = JSON.parse(localStorage.getItem("auth") || "[]");
  //     console.log("sd");
  //     if (
  //       res[0].username == "admin@example.com" &&
  //       res[0].password == "hashed_password"
  //     ) {
  //       navigate("/admin12345678");
  //       console.log("asfdioh");
  //     } else {
  //       navigate("/");
  //     }
  //   }
  // }, []);
  const [id, setId] = React.useState(1);
  const findLatesIndex = async () => {
    const res = (await axios.get("http://localhost:3000/songs")).data;
    res.map((item, id) => {
      setId(item.id + 1);
    });
  };

  findLatesIndex();

  const PostUser = async () => {
    try {
      let response = await axios.post("http://localhost:3000/songs", {
        id,
        title,
        autor,
        link,
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <header className=" bg-gray-600 mb-14">
        <Navbar />
      </header>
      <main>
        <p className="w-[200px] mx-auto text-3xl mb-5">Add Music</p>
        <form className="flex rounded-md flex-col items-center h-[400px] justify-center border p-10 max-w-[400px] mx-auto">
          <div>
            <Label className="text-2xl mt-2">Title</Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              className="w-[300px] mt-3"
              placeholder="MusiqaNomi"
            />
          </div>
          <div className="mt-2">
            <Label className="text-2xl mt-10">Musiqa Avtori</Label>
            <Input
              onChange={(e) => setAutor(e.target.value)}
              type="text"
              className="w-[300px] mt-3"
              placeholder="Autor"
            />
          </div>
          <div className="mt-2">
            <Label className="text-2xl mt-10">Musiqa Linki</Label>
            <Input
              onChange={(e) => setLink(e.target.value)}
              type="text"
              className="w-[300px] mt-3"
              placeholder="Link"
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              PostUser();
            }}
            className="bg-black rounded text-white w-full py-2 mt-10"
          >
            Add Music
          </button>
        </form>
      </main>
    </>
  );
}

export default Admin;
