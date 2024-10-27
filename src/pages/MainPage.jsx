const MainPage = ({ setSessionId }) => {
  const logout = () => setSessionId("null");

  return (
    <div id="login-page">
      <button className="btn" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default MainPage;
