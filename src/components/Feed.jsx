import Media from "./Media";

const Feed = ({ sid, medias = [] }) => {
  return (
    <div className="grid grid-cols-4 gap-1 p-5">
      {medias.map((m) => (
        <Media key={m.id} sid={sid} media={m} />
      ))}
    </div>
  );
};

export default Feed;
