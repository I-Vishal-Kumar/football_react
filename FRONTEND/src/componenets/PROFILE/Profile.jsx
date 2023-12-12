import { useState } from "react";
import Routebtn from "./ProfileComponents/Routebtn";
import { Link } from "react-router-dom";
const Profile = () => {
  let [popup_active, update_pop_active] = useState(false);
  // let [popupPage, update_popup_page] = useState(<Deposit />);
  let button_data = [
    {
      icon_type: "account_balance",
      heading: "bank account",
      subheading: "add+ bank account",
      link_to: "bank_account",
    },
    {
      icon_type: "badge",
      heading: "personal information",
      subheading: "name , withdrawal code",
      link_to: "personal_info",
    },
    {
      icon_type: "request_quote",
      heading: "fund records",
      subheading: "withdraw , deposit",
      link_to: "fund_records",
    },
    {
      icon_type: "bar_chart",
      heading: "affiliate center",
      subheading: "affiliate bonus",
      link_to: "affiliate_center",
    },
    {
      icon_type: "settings",
      heading: "setting",
      subheading: "log out",
      link_to: "settings",
    },
    {
      icon_type: "call",
      heading: "customer service",
      subheading: "contact us",
    },
    {
      icon_type: "book_5",
      heading: "about us",
      subheading: "about us",
    },
  ];
  return (
    <div className=" relative z-10 w-full flex-col bg-accentColor flex md:ml-[70px]">
      {/* avatar section */}
      <section
        style={{ padding: "2rem 0" }}
        className="grid relative place-content-center"
      >
        <div className="text-center">
          <div className="h-[100px] rounded-full aspect-square border-2 border-solid border-white ">
            h
          </div>
          <h3 className="text-white font-bold ">Name</h3>
        </div>
        <span className="bg-white absolute top-2 left-2 rounded-full px-4 py-1">
          VIP 0
        </span>
      </section>
      {/* profile navigators */}
      <section
        style={{
          borderRadius: "2.5rem 2.5rem 0 0 ",
          maxHeight: "75dvh",
          paddingBottom: "10rem",
        }}
        className="overflow-y-auto bg-forgroundColor"
      >
        {/* money handeling section */}
        <div className="flex font-bold text-xl w-full text-center justify-between p-4 mt-4">
          <Link
            to={"deposit"}
            style={{ width: "45%", letterSpacing: "1px" }}
            className="rounded-full grid place-content-center text-white font-bold px-8 h-10  text-center bg-blue-600"
          >
            <span>
              <h2>DEPOSIT</h2>
            </span>
          </Link>
          <Link
            to={"withdraw"}
            style={{ width: "45%", letterSpacing: "1px" }}
            className="rounded-full grid place-content-center text-white font-bold px-8 h-10  text-center bg-blue-600"
          >
            <span>
              <h2>WITHDRAW</h2>
            </span>
          </Link>
        </div>
        {/* different popups */}
        <div className="mt-4 px-2 pb-10">
          {button_data.map((item, idx) => (
            <Routebtn key={idx} {...item} />
          ))}
        </div>
      </section>

      {/* popups container */}
      {popup_active && (
        <section className="h-full z-10 w-full absolute top-0 left-0 bg-slate-300">
          {/* popup close button */}
          <div className="py-2 flex items-center justify-end">
            <span
              onClick={() => update_pop_active(false)}
              className="pr-[30%] py-2 bg-gray-800 flex rounded-tl-full rounded-bl-full"
            >
              <span
                style={{ color: "#FFF", fontSize: "2rem" }}
                className="material-symbols-outlined"
              >
                arrow_back_ios_new
              </span>
            </span>
          </div>
          {/* {popupPage} */}
        </section>
      )}
    </div>
  );
};

export default Profile;
