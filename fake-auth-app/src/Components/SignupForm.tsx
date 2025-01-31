import { useState } from "react";
import { registerUser } from "../register";
import toast from "react-hot-toast";

export const SignUp = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUserNameInput("");
        setPasswordInput("");
        registerUser({ username: userNameInput, password: passwordInput })
          .then(() => {
            toast.success("registered");
          })
          .catch(() => {
            toast.error("something went wrong");
          });
      }}
    >
      <div className="sign-up-box">
        <input
          type="text"
          placeholder="User Name"
          className="user-name"
          value={userNameInput}
          onChange={(e) => setUserNameInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button className="create-account">Create Account</button>
      </div>
    </form>
  );
};
