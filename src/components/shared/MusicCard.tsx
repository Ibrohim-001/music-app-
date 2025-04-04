import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type MusicCardProps = {
  title: string;
  audio: string;
  id: number;
  artist: string;
};

function MusicCard({ id, artist, title, audio }: MusicCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  

  useEffect(() => {
    const likedSongs = JSON.parse(localStorage.getItem("liked") || "[]");
    setIsLiked(likedSongs.includes(id));
  }, [id]);

  const toggleLike = () => {
    let likedSongs = JSON.parse(localStorage.getItem("liked") || "[]");

    if (likedSongs.includes(id)) {
      likedSongs = likedSongs.filter((songId: number) => songId !== id);
      setIsLiked(false);
    } else {
      likedSongs.push(id);
      setIsLiked(true);
    }

    localStorage.setItem("liked", JSON.stringify(likedSongs));
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-1 mt-3 mr-3">
        <p className="text-xl font-medium">{artist}</p>
        <p className="text-xl font-bold">{"-"}</p>
        <p className="text-xl font-medium">{title}</p>
      </div>
      <div className="flex items-center">
        <audio className="w-full" controls>
          <source
            src={
              audio
            }
          />
        </audio>
        <button onClick={toggleLike} className="ml-2">
          <Heart className={isLiked ? "fill-red-500" : ""} />
        </button>
      </div>
    </div>
  );
}

export default MusicCard;
