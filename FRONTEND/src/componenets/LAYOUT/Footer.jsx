import { Home as Homelogo, Hourglass, Person, Receipt } from "react-ionicons";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="block py-1 px-2 w-full z-40 bg-accentColor absolute bottom-0 border-2 border-solid border-l-indigo-700 md:hidden">
      <ul className=" grid grid-cols-5 text-center place-items-center items-center ">
        <Link to={"home"}>
          <li className="grid justify-center align-center">
            <span className="w-fit justify-self-center">
              <Homelogo
                color={"#000"}
                height={"20px"}
                width={"20px"}
                title={"home"}
              />
            </span>
            <span>Home</span>
          </li>
        </Link>
        <Link to={"trades"}>
          <li className="grid justify-center align-center">
            <span className="w-fit justify-self-center">
              <Hourglass
                color={"#000"}
                height={"20px"}
                width={"20px"}
                title={"home"}
              />
            </span>
            <span>Trades</span>
          </li>
        </Link>
        <Link to={"profile/affiliate_center"}>
          <li className="grid justify-center align-center">
            <span className="w-fit justify-self-center">
              <Homelogo
                color={"#000"}
                height={"20px"}
                width={"20px"}
                title={"home"}
              />
            </span>
            <span>Home</span>
          </li>
        </Link>
        <Link to={"record"}>
          <li className="grid justify-center align-center">
            <span className="w-fit justify-self-center">
              <Receipt
                color={"#000"}
                height={"20px"}
                width={"20px"}
                title={"home"}
              />
            </span>
            <span>History</span>
          </li>
        </Link>
        <Link to={"profile"}>
          <li className="grid justify-center align-center">
            <span className="w-fit justify-self-center">
              <Person
                color={"#000"}
                height={"20px"}
                width={"20px"}
                title={"home"}
              />
            </span>
            <span>Profile</span>
          </li>
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
