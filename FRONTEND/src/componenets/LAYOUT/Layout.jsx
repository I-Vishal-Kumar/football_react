import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Usercard from "./Usercard";
import {
  Home as Homelogo,
  Hourglass,
  Person,
  Receipt,
  StatsChart,
} from "react-ionicons";
import AlertBox from "./AlertBox";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAlert } from "../../hooks/useAlert";
const Layout = () => {
  const navigate = useNavigate();
  const { alertState, getAlert } = useAlert();
  const { update_user_data } = useUserContext();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function getUserData() {
      try {
        let res = await axiosPrivate.get("/user_data");
        update_user_data(res.data.data);
      } catch (error) {
        if (error.status === 401 || error.status === 402) {
          navigate("/login");
        }
        getAlert("something went wrong");
      }
    }
    getUserData();
  }, [getAlert]);

  return (
    <>
      <Header />
      <main className="grid grid-cols-8 h-fit  overflow-y-hidden ">
        <section className=" bg-backgroundColor relative flex col-start-1 col-end-9 h-full col-span-7 md:col-end-6 ">
          {/* side toggler for big screens */}
          <div className=" z-20 hidden md:block md:absolute md:visible hover:w-fit hover:text-black text-transparent h-full w-[70px] overflow-hidden py-2 pt-8 bg-forgroundColor rounded-r-md">
            <ul>
              <li className="flex pr-9 hover:shadow-md mb-2 items-center">
                <Link className="flex items-center" to="home">
                  <span className="grid place-items-center h-20 pl-[1rem] pr-[0.5rem]">
                    <Homelogo
                      color={"#666af6"}
                      title={"home"}
                      height={"30px"}
                      width={"30px"}
                    />
                  </span>
                  <h3 className=" text-md font-normal">Home</h3>
                </Link>
              </li>
              <li className="pr-9 hover:shadow-md flex mb-2 items-center">
                <Link className="flex items-center" to="profile">
                  <span className="grid place-items-center h-20 pl-[1rem] pr-[0.5rem]">
                    <Person
                      color={"#666af6"}
                      title={"home"}
                      height={"30px"}
                      width={"30px"}
                    />
                  </span>
                  <h3 className=" text-md font-normal">Profile</h3>
                </Link>
              </li>
              <li className="pr-9 hover:shadow-md flex mb-2 items-center">
                <Link
                  className="flex items-center"
                  to="profile/affiliate_center"
                >
                  <span className="grid place-items-center h-20 pl-[1rem] pr-[0.5rem]">
                    <StatsChart
                      color={"#666af6"}
                      title={"home"}
                      height={"30px"}
                      width={"30px"}
                    />
                  </span>
                  <h3 className=" text-md font-normal">Affiliate</h3>
                </Link>
              </li>
              <li className="pr-9 hover:shadow-md flex mb-2 items-center">
                <Link className="flex items-center" to="record">
                  <span className="grid place-items-center h-20 pl-[1rem] pr-[0.5rem]">
                    <Receipt
                      color={"#666af6"}
                      title={"home"}
                      height={"30px"}
                      width={"30px"}
                    />
                  </span>
                  <h3 className=" text-md font-normal">Records</h3>
                </Link>
              </li>
              <li className="pr-9 hover:shadow-md flex mb-2 items-center">
                <Link className="flex items-center" to="trades">
                  <span className="grid place-items-center h-20 pl-[1rem] pr-[0.5rem]">
                    <Hourglass
                      color={"#666af6"}
                      title={"home"}
                      height={"30px"}
                      width={"30px"}
                    />
                  </span>
                  <h3 className=" text-md font-normal">Trades</h3>
                </Link>
              </li>
            </ul>
          </div>

          {/* this will be our new outlet */}
          {/* main contents */}
          <Outlet />
          {alertState?.state && <AlertBox />}
        </section>
        <section className="p-10 px-14 bg-backgroundColor col-start-6 md:block hidden h-full col-end-9">
          <Usercard />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
