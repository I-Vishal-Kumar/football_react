import Card from "../ProfileComponents/Card";
import Routebtn from "../ProfileComponents/Routebtn";
import { useContext, useState } from "react";
import { useAlert } from "../../../hooks/useAlert";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useUserContext } from "../../../hooks/userContext";

const PersonalInfo = () => {
  const { userData } = useUserContext();
  let [have_account, updateAccountStatus] = useState(
    userData.accountDetails ? true : false
  );
  let { getAlert } = useAlert();
  const axiosPrivate = useAxiosPrivate();
  let [popup, setPopup] = useState(false);
  let [account_details, update_ac_details] = useState({
    account_number: "",
    ifsc_code: "",
    name: "",
    withdraw_pass: "",
  });
  function ac_detail_update(e) {
    update_ac_details((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value.toUpperCase() || e.target.value,
      };
    });
  }

  async function create_account(e) {
    e.preventDefault();
    getAlert("Loading...");
    try {
      let data = {
        account_number: account_details.account_number.trim(),
        ifsc_code: account_details.ifsc_code.trim(),
        name: account_details.name.trim(),
        withdraw_pass: account_details.withdraw_pass.trim(),
      };
      let res = await axiosPrivate.post("/create_account", data);
      console.log(res.data);
      getAlert(res?.data?.message);
    } catch (error) {
      console.log(error);
      getAlert(error?.response?.data?.message || "something went wrong");
    }
  }

  let button_data = [
    {
      icon_type: "account_balance",
      heading: "bank account",
      subheading: "add+ , bank account.",
    },
  ];

  return (
    <div className=" w-full relative flex-col flex md:ml-[70px] ">
      <section
        style={{ padding: "4rem 0" }}
        className="grid relative place-content-center"
      >
        <Routebtn
          style={"w-[80vw] max-w-[500px] bg-slate-200 py-[0.25rem]"}
          {...button_data[0]}
        />
      </section>
      <section
        style={{ boxShadow: "0 0 8px -2px grey" }}
        className="h-[70vh] overflow-y-auto pb-[10rem] rounded-tl-[2.5rem] px-4 rounded-tr-[2.5rem] bg-slate-200 pt-14"
      >
        <div style={{ margin: "0 auto" }} className="w-[80%] max-w-[500px]">
          <Card cardDetails={userData?.accountDetails} />
        </div>
        <div className="mt-8">
          {button_data.map((item, idx) => (
            <Routebtn
              style="py-[0.25rem]"
              {...item}
              handle_click={() => setPopup(true)}
              key={idx}
            />
          ))}
        </div>
      </section>
      {popup && !have_account && (
        <div
          style={{ backdropFilter: "blur(10px)" }}
          className="h-full grid items-center w-full bg-transparent absolute"
        >
          <form
            action="#"
            onSubmit={create_account}
            style={{ margin: "0 auto" }}
            className="p-[1rem] bg-slate-300 md:w-[80%] w-[95%] rounded-[1.25rem] py-[4rem]"
          >
            <h3
              style={{ margin: "0 auto" }}
              className=" underline text-center py-[1rem] underline-offset-4"
            >
              CREATE ACCOUNT
            </h3>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                A/c number
              </label>
              <input
                type="text"
                value={account_details.account_number}
                inputMode="numeric"
                onChange={ac_detail_update}
                required={true}
                id="account_number"
                pattern="^\d{5,}$"
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="Account number"
              />
            </div>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                IFSC code
              </label>
              <input
                type="text"
                value={account_details.ifsc_code}
                onChange={ac_detail_update}
                id="ifsc_code"
                required={true}
                inputMode="text"
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="IFSC code"
              />
            </div>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                Name
              </label>
              <input
                type="text"
                value={account_details.name}
                onChange={ac_detail_update}
                id="name"
                required={true}
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="A/C holder name"
              />
            </div>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                Withdraw pass
              </label>
              <input
                type="text"
                value={account_details.withdraw_pass}
                onChange={ac_detail_update}
                id="withdraw_pass"
                required={true}
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="withdrawal password"
              />
            </div>
            <div className="mt-[3rem] flex justify-between px-[5rem] items-center ">
              <button
                type="submit"
                className="px-[3rem] bg-gray-600 text-white text-xl rounded-full py-[0.5rem] "
              >
                SUBMIT
              </button>
              <button
                onClick={() => setPopup(false)}
                className="px-[3rem] bg-gray-600 text-white text-xl rounded-full py-[0.5rem] "
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
