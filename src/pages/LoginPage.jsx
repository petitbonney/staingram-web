import { useState } from "react";
import { ID, KEY, USER } from "../components/Icons";
import LoginInput from "../components/LoginInput";
import LoginSeparator from "../components/LoginSeparator";
import logo from "/staingram.png";

const LoginPage = ({ setSessionId, toast }) => {
  const [isLoading, setLoading] = useState(false);

  const fetchSessionId = async (url, body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body),
      });
      if (res.ok) {
        return (await res.text()).replace(/"/g, "");
      }
    } catch (error) {}
    return null;
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
    setLoading(true);
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
      toast.error("Wrong password.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setLoading(false);
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
        <button type="submit" className="btn btn-info mt-2 mb-9 text-white" disabled={isLoading}>
          {isLoading ? "Connecting..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
