import { useEffect, useState } from "react";
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import { fetchUserMedias } from "../utils/queries";

const MainPage = ({ sid, logout }) => {
  const [target, setTarget] = useState("");
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    if (target) {
      fetchUserMedias(sid, target).then((userMedias) => {
        const flatMedias = userMedias.flatMap((post) => {
          if ("resources" in post && post.resources.length > 0) {
            return post.resources.map((media, i) =>
              Object.assign({}, post, media, { id: post.id + "_" + i })
            );
          } else {
            return [post];
          }
        });
        console.log(flatMedias);
        setMedias(flatMedias);
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
