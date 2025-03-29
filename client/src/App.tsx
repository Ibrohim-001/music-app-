import { Route, Routes } from "react-router";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import Home from "./_root/pages/Home";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";
import Liked from "./_root/pages/Liked";
import Admin from "./_admin";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/liked" element={<Liked />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/admin12345678" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
