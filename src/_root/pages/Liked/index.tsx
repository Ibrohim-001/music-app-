import MusicCard from "@/components/shared/MusicCard";
import axios from "axios";
import { useEffect, useState } from "react";

function Liked() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getSongs() {
      try {
        const response = await axios("http://localhost:3000/songs");
        const allSongs = response.data;
        console.log(allSongs);

        const likedIds = JSON.parse(localStorage.getItem("liked") || "[]");
        const likedSongs = allSongs.filter((song: any) =>
          likedIds.includes(song.id)
        );
        setData(likedSongs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    }

    getSongs();
  }, []);

  return (
    <div className="col-span-6 flex flex-col gap-10">
      {data.length > 0 ? (
        data.map((item) => (
          <MusicCard
            key={item.id}
            id={item.id}
            artist={item.artist}
            title={item.title}
            audio={item.url}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No liked songs yet.</p>
      )}
    </div>
  );
}

export default Liked;
