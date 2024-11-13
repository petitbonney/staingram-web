import { ID, KEY, USER } from "../components/Icons";
import LoginInput from "../components/LoginInput";
import LoginSeparator from "../components/LoginSeparator";
import logo from "/staingram.png";

const LoginPage = ({ setSessionId }) => {
  const fetchSessionId = async (url, body) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(body),
    });
    if (res.status === 200) {
      return (await res.text()).replace(/"/g, "");
    } else {
      return null;
    }
  };

  const byCredentials = async (username, password) =>
    await fetchSessionId(`${import.meta.env.VITE_API_URL}/auth/login`, {
      username: username,
      password: password,
    });

  const bySessionId = async (sid) =>
    await fetchSessionId(`${import.meta.env.VITE_API_URL}/auth/login_by_sessionid`, {
      sessionid: sid,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    var sid = event.target[2].value;
    if (sid) {
      sid = await bySessionId(sid);
    }
    if (!sid && username && password) {
      sid = await byCredentials(username, password);
    }
    if (sid) {
      setSessionId(sid);
    } else {
      console.log("Login failed");
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
