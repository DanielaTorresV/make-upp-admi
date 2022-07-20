import logoApp from "../../assets/Logo.svg";
import LogOutButton from "./LogoutButton";

const Nav = () => {
  return (
    <div className="containerNav">
      <img src={logoApp} alt="logo" className="logoNav"></img>
      <p className="welcomeNav">Manager, ¡Welcome to MakeUpp!</p>
      <LogOutButton />
    </div>
  );
};

export default Nav;
