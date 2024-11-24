import NavBar from "../components/NavBar";

const MainPage = ({ sid, logout }) => {
  return (
    <div id="main-page" className="flex-1 flex-col min-w-full">
      <NavBar sid={sid} logout={logout} />
      <div className="flex-1 items-center justify-center">
      </div>
    </div>
  );
};

export default MainPage;
