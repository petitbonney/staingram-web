import { useEffect, useState } from "react";
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import { fetchUserMedias } from "../utils/queries";

const MainPage = ({ sid, logout }) => {
  const [target, setTarget] = useState("");
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    if (target) {
      fetchUserMedias(sid, target).then(userMedias => {
        console.log(userMedias)
        setMedias(userMedias)
      });
    }
  }, [target]);

  return (
    <div id="main-page" className="flex-1 flex-col min-w-full">
      <NavBar sid={sid} logout={logout} setTarget={setTarget} />
      <div className="items-center justify-center">
        <Feed sid={sid} medias={medias} />
      </div>
    </div>
  );
};

export default MainPage;
