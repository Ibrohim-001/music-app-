import MusicCard from "@/components/shared/MusicCard";
import axios from "axios";
import React, { useEffect } from "react";
function Home() {
  const [data, setData] = React.useState([]);
  async function getSongs() {
    setData((await axios("http://localhost:3000/songs")).data);
  }
  useEffect(() => {
    getSongs();
  }, []);

  console.log(data);
  return (
    <>
      <div className="col-span-6 flex flex-col gap-10">
        {data.map((item, id) => (
          <MusicCard
            key={item.id}
            id={id + 1}
            artist={item.artist}
            title={item.title}
            audio={item.url}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
