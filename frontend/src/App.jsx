import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

import UserContextProvider from "./context/UserContextProvider";

import { Toaster } from "react-hot-toast";
import Protected from "./components/Protected";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route path="/" element={<Navigate to={"dashboard"} />} />
          <Route
            path="/send"
            element={
              <Protected>
                <SendMoney />
              </Protected>
            }
          />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
