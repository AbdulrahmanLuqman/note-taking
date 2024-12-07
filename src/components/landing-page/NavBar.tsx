import { Link } from "react-router-dom";

const buttonStyles = "bg-[#312D2D] text-white rounded-2xl py-1 px-4";
const hoverStyles = "hover:bg-gray-200 rounded-2xl py-1 sm:px-4";

const NavBar = () => {
  return (
    <nav className="flex justify-between sm:items-center sm:flex-row flex-col gap-3 sm:gap-0">
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-3">
        <button className={hoverStyles}>
          <a href="#feature">Features</a>{" "}
        </button>
        <Link to="/dashboard">
          <GetStarted />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

export const GetStarted = () => {
  return <button className={buttonStyles}>Get Started</button>;
};

export const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <img src="./logo.png" alt="logo" className="w-[60px] h-[50px]" />
      <h2 className="text-xl font-medium">noter</h2>
    </div>
  );
};
