import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));
  useEffect(() => localStorage.setItem("sessionId", sessionId), [sessionId]);

  return (
    <>
      {sessionId == "null" ? (
        <LoginPage setSessionId={setSessionId} toast={toast} />
      ) : (
        <MainPage setSessionId={setSessionId} toast={toast} />
      )}
      <ToastContainer className="justify-end" pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
