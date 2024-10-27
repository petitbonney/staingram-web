import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";

const App = () => {
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));

  useEffect(() => localStorage.setItem("sessionId", sessionId), [sessionId]);

  if (sessionId == "null") {
    return <LoginPage setSessionId={setSessionId} />;
  } else {
    return <MainPage setSessionId={setSessionId} />;
  }
};

export default App;
