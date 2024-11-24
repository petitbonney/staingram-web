import { useState } from "react";
import { ID, KEY, USER } from "../components/Icons";
import LoginInput from "../components/LoginInput";
import LoginSeparator from "../components/LoginSeparator";
import logo from "/staingram.png";

const LoginPage = ({ loginByCredentials, loginBySessionId, setSid, toast }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    var sid = event.target[2].value;
    if (sid) {
      sid = await loginBySessionId(sid);
    }
    if (!sid && username && password) {
      sid = await loginByCredentials(username, password);
    }
    if (sid) {
      setSid(sid);
    } else {
      toast.error("Wrong credentials.", {
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
        <img src={logo} className="logo mt-9 mb-3" />
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
