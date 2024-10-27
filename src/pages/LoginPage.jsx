import { ID, KEY, USER } from "../components/Icons";
import LoginInput from "../components/LoginInput";
import LoginSeparator from "../components/LoginSeparator";
import logo from "/staingram.png";

const LoginPage = ({ setSessionId }) => {
  const getSessionId = (username, password) => {
    return `${username}_${password}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    var sessionId = event.target[2].value;
    if (username && password && !sessionId) {
      sessionId = getSessionId(username, password);
    }
    if (sessionId) {
      setSessionId(sessionId);
    }
  };

  return (
    <div id="login-page" className="flex-col border border-gray-300 px-10">
      <div className="justify-center">
        <img src={logo} className="logo mt-9 mb-3" alt="Vite logo" />
      </div>
      <form onSubmit={handleSubmit} className="flex-col mt-6">
        <LoginInput icon={USER} type="text" placeholder="Username" />
        <LoginInput icon={KEY} type="password" placeholder="Password" />
        <LoginSeparator />
        <LoginInput icon={ID} type="password" placeholder="Session ID" />
        <button type="submit" className="btn mt-2 mb-9 text-white bg-sky-500">
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
