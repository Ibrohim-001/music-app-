import { TextLoop } from "@/components/motion-primitives/text-loop";
import Navbar from "@/components/shared/Navbar";
import { Link, Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <header className=" bg-gray-600 mb-14">
        <Navbar />
      </header>
      <main className="max-w-[1200px] mx-auto grid grid-cols-12 h-full">
        <aside className="col-span-3 h-full ">
          <ul className="flex flex-col gap-4">
            <li className="font-bold text-3xl">Menu</li>
            <li className="mt-4 text-[18px] ml-[16px]">
              <Link to={"/"}>Musiqalar</Link>
            </li>
            <li className="mt-2 text-[18px] ml-[16px]">
              <Link to={"/liked"}>Yoqtirganlar</Link>
            </li>
          </ul>
        </aside>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
