export const LogIn = () => {
  return (
    <div className="log-in-box">
      <input
        type="text"
        placeholder="User Name"
        className="user-login"
      />
      <input
        type="text"
        placeholder="Password"
        className="password"
      />
      <button className="log-in">Log In</button>
    </div>
  );
};
