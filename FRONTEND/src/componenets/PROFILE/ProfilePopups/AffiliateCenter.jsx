import Routebtn from "../ProfileComponents/Routebtn";
import { useState } from "react";
import AffiliatePopups from "./AffiliatePopups";

const PersonalInfo = () => {
  let [popup_active, update_pop_active] = useState(false);
  let [popup_data, update_popup_data] = useState({});

  let button_data = [
    {
      icon_type: "group",
      heading: "new register",
      subheading: "invited team members",
    },
    {
      icon_type: "wallet",
      heading: "new deposit",
      subheading: "team members deposit",
    },
    {
      icon_type: "sports_soccer",
      heading: "new bets",
      subheading: "team members bets",
    },
    {
      icon_type: "paid",
      heading: "total withdrawal",
      subheading: "team withdrawals",
    },
    {
      icon_type: "person_add",
      heading: "invite",
      subheading: "join new members",
    },
  ];

  let data = [
    {
      topic: "register",
      data: [
        { level: 0, value: 1 },
        { level: 0, value: 1 },
        { level: 0, value: 1 },
      ],
    },
    {
      topic: "deposit",
      data: [
        { level: 0, value: 100 },
        { level: 0, value: 10 },
        { level: 0, value: 20 },
      ],
    },
    {
      topic: "bets",
      data: [
        { level: 0, value: 1 },
        { level: 0, value: 1 },
        { level: 0, value: 1 },
      ],
    },
    {
      topic: "withdrawal",
      data: [
        { level: 0, value: 1 },
        { level: 0, value: 1 },
        { level: 0, value: 1 },
      ],
    },
  ];
  function handlePopup(toggle) {
    update_pop_active(toggle);
  }
  function getPopup(idx) {
    update_popup_data(data[idx]);
    update_pop_active(true);
  }

  return (
    <div className=" w-full relative flex-col flex md:ml-[70px] bg-white border-2 border-solid border-white">
      <section style={{ padding: "4rem 6rem" }}>
        <div className="flex text-center justify-between ">
          <div>
            <h3 className="px-4 py-2 bg-slate-900 text-white rounded-full">
              Affiliate rebate
            </h3>
            <h4 className="mt-3 font-bold">0.00</h4>
          </div>
          <div>
            <h3 className="px-4 py-2 bg-slate-900 text-white rounded-full">
              Promotion Bonus
            </h3>
            <h4 className="mt-3 font-bold">0.00</h4>
          </div>
        </div>
      </section>
      <section
        style={{ boxShadow: "0 0 8px -2px grey" }}
        className="h-[70vh] overflow-y-auto pb-[10rem] rounded-tl-[2.5rem] px-4 rounded-tr-[2.5rem] bg-slate-200 pt-14"
      >
        {button_data.map((item, idx) => (
          <div key={idx}>
            <Routebtn
              handle_click={() => getPopup(idx)}
              style="py-[0.25rem]"
              {...item}
            />
          </div>
        ))}
      </section>

      {popup_active && (
        <AffiliatePopups data={popup_data} handlePopup={handlePopup} />
      )}
    </div>
  );
};

export default PersonalInfo;
