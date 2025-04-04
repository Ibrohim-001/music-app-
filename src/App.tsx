import { Route, Routes } from "react-router";
import AuthLayout from "./_auth/AuthLayout";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";
import Admin from "./_admin";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/dashboard" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
