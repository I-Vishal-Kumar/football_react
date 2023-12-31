import { useUserContext } from "../../hooks/userContext";
import LOGO from "../HOME/HomeAssets/LOGO.png";
function Header() {
  let { userData } = useUserContext();
  return (
    <header className="flex justify-between items-center px-4 py-1 h-18 bg-header_background ">
      <div
        style={{
          background: `url(${LOGO}) center no-repeat`,
          backgroundSize: "contain",
        }}
        className="rounded-full bg-forgroundColor h-full aspect-square"
      ></div>
      <div className="rounded-full bg-slate-100 px-2 py-1">
        <h3>
          <span className="px-2">Rs</span>
          {((userData?.balance || 0) / 100).toFixed(2)}
        </h3>
      </div>
    </header>
  );
}

export default Header;
