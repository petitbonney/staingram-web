const MainPage = ({ setSessionId }) => {
  const logout = () => setSessionId("null");

  return (
    <div id="main-page">
      <button className="btn" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default MainPage;
