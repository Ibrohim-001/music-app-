import { Link, useNavigate } from "react-router";
import { TextLoop } from "../motion-primitives/text-loop";
import React, { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = React.useState(true);
  useEffect(() => {
    localStorage.getItem("auth") ? setIsAuth(false) : navigate("/sign-up");
  }, []);
  return (
    <>
      <div className="flex items-center justify-between gap-2 bg-gray-600 p-2 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <span className="p-1 text-3xl  font-bold bg-amber-50 rounded-full border-4 border-[#818275]">
            M
          </span>
          <TextLoop className="text-3xl text-white">
            <span>Musiqalar</span>
            <span>Qo'shiqlar</span>
            <span>Ashulalar</span>
          </TextLoop>
        </div>

        {isAuth && (
          <div className="flex gap-3">
            <Link
              to="/sign-up"
              className="bg-white rounded-xl py-2 px-4 font-medium"
            >
              Sign-up
            </Link>
            <Link
              to="/sign-in"
              className="bg-[#818275] text-white rounded-xl py-2 px-4 font-medium"
            >
              Sign-in
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
