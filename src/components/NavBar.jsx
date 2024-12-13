import { useEffect, useState } from "react";
import { fetchImage, fetchUserId, fetchUserInfo } from "../utils/queries";
import logo from "/staingram.png";

const NavBar = ({ sid, logout, setTarget }) => {
  const [me, setMe] = useState(JSON.parse(localStorage.getItem("me") || "{}"));
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (sid && JSON.stringify(me) === "{}") {
      fetchUserId(sid).then((uid) => fetchUserInfo(sid, uid).then(setMe));
    }
  }, [sid]);

  useEffect(() => {
    localStorage.setItem("me", JSON.stringify(me));
    fetchImage(sid, me.profile_pic_url, me.username).then(URL.createObjectURL).then(setProfilePic);
  }, [me]);

  const search = (text) => {
    if (isNaN(text)) {
      fetchUserId(sid, text).then(setTarget);
    } else {
      setTarget(text);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a>
          <img src={logo} className="max-h-12" />
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto !outline-none"
            onKeyDown={(e) =>
              e.key === "Enter" && e.currentTarget.value && search(e.currentTarget.value)
            }
          />
        </div>

        {profilePic && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profilePic} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
