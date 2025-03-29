import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <>
      <header className=" bg-gray-600 mb-14">
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}

export default AuthLayout;
