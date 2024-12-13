import { useEffect, useState } from "react";
import { fetchImage } from "../utils/queries";

const Media = ({ sid, media }) => {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const thumbnail_url = media.thumbnail_url || media.resources[0].thumbnail_url;
    fetchImage(sid, thumbnail_url, media.user.username).then(URL.createObjectURL).then(setImg);
  }, []);

  return (
    <div className="flex-col aspect-square">
      <img
        className="flex-1 aspect-square cursor-pointer object-cover object-center"
        src={img}
        onClick={() => open(media.video_url || img, "_blank")}
        // onClick={() => open(img, "_blank")}
      />
    </div>
  );
};

export default Media;
