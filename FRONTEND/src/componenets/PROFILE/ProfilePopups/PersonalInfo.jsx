import { useState } from "react";
import Routebtn from "../ProfileComponents/Routebtn";
import { useUserContext } from "../../../hooks/userContext";
import { useAlert } from "../../../hooks/useAlert";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const PersonalInfo = () => {
  let { userData } = useUserContext();
  let [isUpdateName, set_name_popup] = useState(false);
  let [isUpdateWithdraw, set_withdraw_popup] = useState(false);
  let [isUpdatePassword, set_pass_popup] = useState(false);
  let [isUpdatePhone, set_phone_popup] = useState(true);

  const { getAlert } = useAlert();
  const { axiosPrivate } = useAxiosPrivate();

  let button_data = [
    {
      icon_type: "badge",
      heading: "name",
      subheading: "name",
    },
    {
      icon_type: "account_balance",
      heading: "withdrawal code",
      subheading: "set up withdrawal code",
    },
    {
      icon_type: "fingerprint",
      heading: "password",
      subheading: "login password",
    },
    {
      icon_type: "call",
      heading: "phonne number",
      subheading: "phone number",
    },
  ];

  function getInfo(idx) {
    switch (idx) {
      case 0:
        set_name_popup(true);
        break;
      case 1:
        set_withdraw_popup(true);
        break;
      case 2:
        set_pass_popup(true);
        break;
      case 3:
        set_phone_popup(true);
        break;
    }
  }

  // change name ---------------------
  let [name, update_name] = useState("");
  async function change_name(e) {
    e.preventDefault();
    getAlert("Loading...");

    try {
      let data = { name: name.trim() };
      let res = await axiosPrivate.post("change_name", data);
      getAlert(res?.data?.message || "something went wrong");
    } catch (error) {
      getAlert(error?.response?.message || "something went wrong");
    }
  }
  // ---------------------------------

  // change withdraw pass -------------
  let [withdraw_pass_details, update_withdraw_pass] = useState({
    pass: "",
    conf_pass: "",
    otp: "",
  });
  function update_witdraw_pass_details(e) {
    if (
      e.target.id === "conf_pass" &&
      e.target.value !== withdraw_pass_details.pass
    ) {
      e.target.style.border = "1.25px solid red";
    } else {
      e.target.style.border = "1px solid gray";
    }
    update_withdraw_pass((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }
  async function change_withdraw_pass(e) {
    e.preventDefault();
    let data = {
      pass: withdraw_pass_details.pass,
      otp: withdraw_pass_details.otp,
    };
    getAlert("Loading...");
    try {
      let res = await axiosPrivate.post("change_withdraw_pass", data);
      getAlert(res?.data?.message || "something went wrong");
    } catch (error) {
      getAlert(error?.response?.data?.message || "something went wrong");
    }
  }
  // ----------------------------------

  // change password -----------------------
  let [pass_details, update_pass] = useState({
    pass: "",
    conf_pass: "",
    otp: "",
  });
  function update_pass_details(e) {
    if (e.target.id === "conf_pass" && e.target.value !== pass_details.pass) {
      e.target.style.border = "1.25px solid red";
    } else {
      e.target.style.border = "1px solid gray";
    }
    update_pass((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }
  async function change_pass(e) {
    e.preventDefault();
    let data = {
      pass: pass_details.pass,
      otp: pass_details.otp,
    };
    getAlert("Loading...");
    try {
      let res = await axiosPrivate.post("change_pass", data);
      getAlert(res?.data?.message || "something went wrong");
    } catch (error) {
      getAlert(error?.response?.data?.message || "something went wrong");
    }
  }
  // ----------------------------------------

  // change number---------------------------
  let [phone_details, update_ph_details] = useState({
    phoneNumber: "",
    otp: "",
  });
  function update_phone_details(e) {
    update_ph_details((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }
  async function change_number(e) {
    e.preventDefault();
    let data = {
      phoneNumber: phone_details.phoneNumber.trim(),
      otp: phone_details.otp,
    };
    try {
      let res = await axiosPrivate.post("change_phone_number", data);
      getAlert(res?.data?.message || "something went wrong");
    } catch (error) {
      getAlert(error?.response?.data?.message || "something went wrong");
    }
  }
  // ----------------------------------------

  return (
    <div className=" w-full relative flex-col flex md:ml-[70px] border-2 border-solid border-white">
      <section
        style={{ padding: "4rem 0" }}
        className="grid relative place-content-center"
      >
        <Routebtn
          style={"w-[80vw] max-w-[500px] bg-slate-200 py-[0.25rem]"}
          icon_type={"badge"}
          heading={"personal information"}
          subheading={"name, withdrawal code"}
        />
      </section>
      <section
        style={{ boxShadow: "0 0 8px -2px grey" }}
        className="h-[70vh] overflow-y-auto pb-[10rem] rounded-tl-[2.5rem] px-4 rounded-tr-[2.5rem] bg-slate-200 pt-14"
      >
        {button_data.map((item, idx) => (
          <Routebtn
            handle_click={() => getInfo(idx)}
            style="py-[0.25rem]"
            {...item}
            key={idx}
          />
        ))}
      </section>

      {isUpdateName && (
        <div
          style={{ backdropFilter: "blur(10px)" }}
          className="h-full grid items-center w-full bg-transparent absolute"
        >
          <form
            action="#"
            onSubmit={change_name}
            style={{ margin: "0 auto" }}
            className="p-[1rem] bg-slate-300 md:w-[80%] w-[95%] rounded-[1.25rem] py-[4rem]"
          >
            <h3
              style={{ margin: "0 auto" }}
              className=" underline text-center py-[1rem] underline-offset-4"
            >
              CHANGE NAME
            </h3>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                Enter new name
              </label>
              <input
                type="text"
                value={name}
                inputMode="text"
                onChange={(e) => update_name(e.target.value)}
                required={true}
                id="name"
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="new name"
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
                type="button"
                onClick={() => set_name_popup(false)}
                className="px-[3rem] bg-gray-600 text-white text-xl rounded-full py-[0.5rem] "
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
      {isUpdateWithdraw && (
        <div
          style={{ backdropFilter: "blur(10px)" }}
          className="h-full grid items-center w-full bg-transparent absolute"
        >
          <form
            action="#"
            onSubmit={change_withdraw_pass}
            style={{ margin: "0 auto" }}
            className="p-[1rem] bg-slate-300 md:w-[80%] w-[95%] rounded-[1.25rem] py-[4rem]"
          >
            <h3
              style={{ margin: "0 auto" }}
              className=" underline text-center py-[1rem] underline-offset-4"
            >
              CHANGE WITHDRAW PASSWORD
            </h3>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                Enter new password
              </label>
              <input
                type="text"
                value={withdraw_pass_details.pass}
                inputMode="text"
                onChange={update_witdraw_pass_details}
                required={true}
                id="pass"
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="new password"
              />
            </div>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                Confirm password
              </label>
              <input
                type="text"
                value={withdraw_pass_details.conf_pass}
                inputMode="text"
                onChange={update_witdraw_pass_details}
                required={true}
                id="conf_pass"
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="confirm password"
              />
            </div>
            <div className="flex mt-[0.7rem] justify-between pr-[2rem] items-center text-xl ">
              <div>
                <label
                  className="font-bold py-[0.25rem]"
                  htmlFor="acountNumber"
                >
                  Otp
                </label>
                <input
                  type="number"
                  value={withdraw_pass_details.otp}
                  inputMode="numeric"
                  onChange={update_witdraw_pass_details}
                  required={true}
                  id="otp"
                  className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                  placeholder="Enter the Otp"
                />
              </div>
              <div
                style={{ alignSelf: "end" }}
                className="bg-purple-600  text-white px-[1rem] py-[0.25rem] rounded-full"
              >
                get OTP
              </div>
            </div>
            <div className="mt-[3rem] flex justify-between px-[5rem] items-center ">
              <button
                type="submit"
                className="px-[3rem] bg-gray-600 text-white text-xl rounded-full py-[0.5rem] "
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={() => set_withdraw_popup(false)}
                className="px-[3rem] bg-gray-600 text-white text-xl rounded-full py-[0.5rem] "
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
      {isUpdatePassword && (
        <div
          style={{ backdropFilter: "blur(10px)" }}
          className="h-full grid items-center w-full bg-transparent absolute"
        >
          <form
            action="#"
            onSubmit={change_pass}
            style={{ margin: "0 auto" }}
            className="p-[1rem] bg-slate-300 md:w-[80%] w-[95%] rounded-[1.25rem] py-[4rem]"
          >
            <h3
              style={{ margin: "0 auto" }}
              className=" underline text-center py-[1rem] underline-offset-4"
            >
              CHANGE PASSWORD
            </h3>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                Enter new password
              </label>
              <input
                type="text"
                value={pass_details.pass}
                inputMode="text"
                onChange={update_pass_details}
                required={true}
                id="pass"
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="new password"
              />
            </div>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                Confirm password
              </label>
              <input
                type="text"
                value={pass_details.conf_pass}
                inputMode="text"
                onChange={update_pass_details}
                required={true}
                id="conf_pass"
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="confirm password"
              />
            </div>
            <div className="flex mt-[0.7rem] justify-between pr-[2rem] items-center text-xl ">
              <div>
                <label
                  className="font-bold py-[0.25rem]"
                  htmlFor="acountNumber"
                >
                  Otp
                </label>
                <input
                  type="number"
                  value={pass_details.otp}
                  inputMode="numeric"
                  onChange={update_pass_details}
                  required={true}
                  id="otp"
                  className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                  placeholder="Enter the Otp"
                />
              </div>
              <div
                style={{ alignSelf: "end" }}
                className="bg-purple-600  text-white px-[1rem] py-[0.25rem] rounded-full"
              >
                get OTP
              </div>
            </div>
            <div className="mt-[3rem] flex justify-between px-[5rem] items-center ">
              <button
                type="submit"
                className="px-[3rem] bg-gray-600 text-white text-xl rounded-full py-[0.5rem] "
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={() => set_pass_popup(false)}
                className="px-[3rem] bg-gray-600 text-white text-xl rounded-full py-[0.5rem] "
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
      {isUpdatePhone && (
        <div
          style={{ backdropFilter: "blur(10px)" }}
          className="h-full grid items-center w-full bg-transparent absolute"
        >
          <form
            action="#"
            onSubmit={change_number}
            style={{ margin: "0 auto" }}
            className="p-[1rem] bg-slate-300 md:w-[80%] w-[95%] rounded-[1.25rem] py-[4rem]"
          >
            <h3
              style={{ margin: "0 auto" }}
              className=" underline text-center py-[1rem] underline-offset-4"
            >
              CHANGE PHONE NUMBER
            </h3>
            <div className="flex mt-[0.7rem] flex-col text-xl ">
              <label className="font-bold py-[0.25rem]" htmlFor="acountNumber">
                Enter new number
              </label>
              <input
                type="text"
                value={phone_details.phoneNumber}
                inputMode="numeric"
                onChange={update_phone_details}
                required={true}
                id="phoneNumber"
                className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                placeholder="New number"
              />
            </div>
            <div className="flex mt-[0.7rem] justify-between pr-[2rem] items-center text-xl ">
              <div>
                <label
                  className="font-bold py-[0.25rem]"
                  htmlFor="acountNumber"
                >
                  Otp
                </label>
                <input
                  type="number"
                  value={phone_details.otp}
                  inputMode="numeric"
                  onChange={update_phone_details}
                  required={true}
                  id="otp"
                  className="px-[0.5rem] invalid:border-red-500 invalid:border-[1.25px] outline-none border-[1.15px] rounded-[0.25rem] border-solid border-gray-900 w-full py-[0.25rem]"
                  placeholder="Enter the Otp"
                />
              </div>
              <div
                style={{ alignSelf: "end" }}
                className="bg-purple-600  text-white px-[1rem] py-[0.25rem] rounded-full"
              >
                get OTP
              </div>
            </div>
            <div className="mt-[3rem] flex justify-between px-[5rem] items-center ">
              <button
                type="submit"
                className="px-[3rem] bg-gray-600 text-white text-xl rounded-full py-[0.5rem] "
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={() => set_phone_popup(false)}
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
