import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginByCredentials, loginBySessionId } from "./utils/queries.jsx";

const App = () => {
  const [sid, setSid] = useState(localStorage.getItem("sid") || "");

  const logout = () => setSid("");

  useEffect(() => localStorage.setItem("sid", sid), [sid]);

  return (
    <>
      {sid ? (
        <MainPage sid={sid} logout={logout} toast={toast} />
      ) : (
        <LoginPage
          loginByCredentials={loginByCredentials}
          loginBySessionId={loginBySessionId}
          setSid={setSid}
          toast={toast}
        />
      )}
      <ToastContainer className="justify-end" pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
