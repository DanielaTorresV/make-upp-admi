import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const nav = useNavigate();
  return (
    <button
      onClick={() => {
        localStorage.clear();
        nav("/");
      }}
      className="logOutButton-nav"
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
