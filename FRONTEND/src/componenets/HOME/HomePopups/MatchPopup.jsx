import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { useAlert } from "../../../hooks/useAlert";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../hooks/userContext";
import vslogo from "../HomeAssets/vslogo.png";
const MatchPopup = ({
  update_confirm_data,
  confirmed_data,
  set_confirm,
  confirm_popup,
  data,
  set_popup,
}) => {
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const scores = [
    "0-0",
    "0-1",
    "0-2",
    "0-3",
    "1-0",
    "1-1",
    "1-2",
    "1-3",
    "2-0",
    "2-1",
    "2-2",
    "2-3",
    "3-0",
    "3-1",
    "3-2",
    "3-3",
    "4-4",
  ];
  let { getAlert } = useAlert();
  let available_amount = useRef();
  let amountRef = useRef();
  let updaterRef = useRef();

  //  place the bet whose data is in confirmed_data
  async function placeBet() {
    getAlert("Loading.....");
    if (!confirmed_data) getAlert("Something went wrong try again.");
    try {
      let res = await axiosPrivate.post("placeBet", confirmed_data);
      getAlert(res?.data?.message || "something went wrong");
    } catch (error) {
      getAlert(error?.response?.data?.message);
      if (error?.response?.data?.status === "login") {
        setTimeout(() => {
          navigate("../login");
        }, 1000);
      }
    } finally {
      set_confirm(false);
      set_popup(false, 0);
    }
  }

  useEffect(() => {
    let values = updaterRef.current?.children;
    if (values) {
      Array.from(values).forEach((item) => {
        item.addEventListener("click", updateAmount);
      });
    }
    return () => {
      if (values) {
        Array.from(values).forEach((item) => {
          item.removeEventListener("click", updateAmount);
        });
      }
    };
  }, [update_confirm_data, confirmed_data]);

  function updateAmount(e) {
    let amount = parseFloat(e.target.value) || parseFloat(e.target.innerText);
    if (!amount && !e.target.innerText) amount = "";
    if (!amount && e.target.innerText?.length > 2) {
      amount = Number(userData?.balance) / 100 || 10;
    }

    amount
      ? (available_amount.current.innerText = (
          (parseFloat(confirmed_data.percent.replace("%", "")) / 100) *
          amount
        ).toFixed(2))
      : (available_amount.current.innerText = "0.00");

    update_confirm_data((prev) => {
      return { ...prev, amount: amount };
    });
  }

  return (
    <div className="absolute w-full md:w-[91%] h-full bg-backgroundColor flex-col flex md:ml-[70px]">
      <div
        className="  py-4 text-center rounded-bl-[1.4rem] 
        rounded-br-[1.4rem]"
      >
        <h2 className="whitespace-nowrap overflow-hidden h-[20%]">
          {data.leagueName}
        </h2>
        <div className="grid h-[80%] py-2 px-4 [&>*]:h-full grid-cols-3">
          <div
            style={{
              gridTemplateRows: "1fr",
            }}
            className="grid"
          >
            <span className=" h-full flex justify-center">
              <img
                src={data.team_a_logo || "fallback-image-url-if-null"}
                alt="Team A Logo"
                style={{
                  objectFit: "contain", // You can use 'cover' or other values depending on your requirements
                  width: "50%", // Set width to 100% to ensure it doesn't overflow
                }}
              />
            </span>
            <h3 className="whitespace-nowrap text-center overflow-hidden">
              {data.team_a}
            </h3>
          </div>
          <div
            style={{
              background: `url(${vslogo}) center no-repeat`,
              backgroundSize: "70%",
              gridTemplateRows: "1fr ",
            }}
            className="grid"
          >
            <span className="h-full"></span>
            <h3></h3>
          </div>
          <div
            style={{
              gridTemplateRows: "1fr ",
            }}
            className="grid"
          >
            <span className="h-full w-full flex justify-center">
              <img
                src={data.team_b_logo || "fallback-image-url-if-null"}
                alt="Team B Logo"
                style={{
                  border: "1px solid whtie",
                  objectFit: "contain", // You can use 'cover' or other values depending on your requirements
                  width: "50%", // Set width to 100% to ensure it doesn't overflow
                }}
              />
            </span>
            <h3 className="whitespace-nowrap overflow-hidden">{data.team_b}</h3>
          </div>
        </div>
      </div>
      <div
        style={{ margin: "1rem auto" }}
        className="text-white mt-[3rem] bg-forgroundColor rounded-full w-[95%] items-center [&>*]:bg-buttonColor [&>*]:py-2 [&>*]:px-4 [&>*]:rounded-full grid grid-cols-3 gap-4 text-center px-4 h-[10%]"
      >
        <h3>ITEM</h3>
        <h3>PROFIT</h3>
        <h3>QUANTITY</h3>
      </div>
      <div className=" mt-4 overflow-y-auto h-[65%] pb-5">
        {data.percentages.map((percent, i) => (
          <span
            key={i}
            onClick={() => {
              set_confirm(true, i, scores[i]);
            }}
            style={{ margin: "0.5rem auto" }}
            className=" grid grid-cols-3 text-center items-center  border-b-2 border-solid py-1 border-buttonColor w-[95%] justify-center"
          >
            <h3>{scores[i]}</h3>
            <h3>{percent} %</h3>
            <h3 className="p-2 py-0 bg-buttonColor justify-self-center text-textColor w-[50%]  rounded-full">
              BET
            </h3>
          </span>
        ))}
      </div>
      {confirm_popup && (
        <section
          style={{
            transform: "translate(-50% , -50%)",
            boxShadow: "0px 0px 100px gray",
          }}
          className="absolute md:w-[70%] rounded-[1.4rem] p-3 bg-white px-2 w-[90%] top-[50%] left-[50%]  text-center min-h-[60%] "
        >
          <h3 className="py-2">Against Full Time {confirmed_data.score}</h3>
          <div className="grid h-[30%] py-2 px-4 [&>*]:h-full grid-cols-3">
            <div
              style={{
                gridTemplateRows: "2fr 0.5fr",
              }}
              className="grid"
            >
              <span className=" h-full flex justify-center">
                <img
                  src={data.team_a_logo || "fallback-image-url-if-null"}
                  alt="Team a Logo"
                  style={{
                    border: "1px solid whtie",
                    objectFit: "contain", // You can use 'cover' or other values depending on your requirements
                    width: "50%", // Set width to 100% to ensure it doesn't overflow
                  }}
                />
              </span>
              <h3 className="">{data.team_a}</h3>
            </div>
            <div
              style={{
                gridTemplateRows: "2fr 0.5fr",
                background: `url(${vslogo}) center no-repeat`,
                backgroundSize: "60%",
              }}
              className="grid"
            >
              <span className="h-full"></span>
              <h3></h3>
            </div>
            <div
              style={{
                gridTemplateRows: "2fr 0.5fr",
              }}
              className="grid"
            >
              <span className="h-full flex justify-center">
                <img
                  src={data.team_b_logo || "fallback-image-url-if-null"}
                  alt="Team B Logo"
                  style={{
                    border: "1px solid whtie",
                    objectFit: "contain", // You can use 'cover' or other values depending on your requirements
                    width: "50%", // Set width to 100% to ensure it doesn't overflow
                  }}
                />
              </span>
              <h3 className="wordwrap-nowrap overflow-hidden">{data.team_b}</h3>
            </div>
          </div>
          <div
            style={{ margin: "0 auto" }}
            className="bg-forgroundColor flex justify-evenly py-[0.25rem] text-black rounded-full text-center w-[70%]"
          >
            <h4>{confirmed_data.date}</h4>
            <h4>{confirmed_data.time}</h4>
          </div>
          <div className="rounded-[1.25rem] bg-forgroundColor  text-black pb-3 px-1 mt-4">
            <div
              style={{ gridTemplateColumns: "1.5fr 1fr 1fr" }}
              className="grid  text-center py-3 "
            >
              <div>
                <h4>Amount</h4>
                <input
                  ref={amountRef}
                  value={confirmed_data.amount}
                  onChange={updateAmount}
                  className="rounded-full text-center text-black outline-none p-[0.1rem]"
                  type="number"
                />
              </div>
              <div>
                <h4>Profit %</h4>
                <h5>{confirmed_data.percent} %</h5>
              </div>
              <div>
                <h4>Available</h4>
                <h5 ref={available_amount}>0.00</h5>
              </div>
            </div>
            <div className="text-end px-4">
              <h6>Handeling fee - Rs 1.</h6>
            </div>
            <div
              ref={updaterRef}
              className="grid [&>*]:py-[0.12rem] mt-2 px-1 [&>*]:border-[1px] [&>*]:border-solid [&>*]:rounded-full gap-2 [&>*]:border-white  grid-cols-5"
            >
              <h5>+1000</h5>
              <h5>+2000</h5>
              <h5>+5000</h5>
              <h5>+10000</h5>
              <h5>+ ALL</h5>
            </div>
          </div>
          <div className="flex [&>*]:py-3 [&>*]:border-2 [&>*]:w-[40%] mt-10 [&>*]:rounded-full justify-evenly">
            <h2 onClick={placeBet} className="bg-buttonColor text-white">
              CONFIRM
            </h2>
            <h2
              onClick={() => {
                set_confirm(false, 0);
                set_popup(false, 0);
              }}
            >
              CANCEL
            </h2>
          </div>
        </section>
      )}
    </div>
  );
};

MatchPopup.propTypes = {
  set_confirm: PropTypes.func,
  update_confirm_data: PropTypes.func,
  confirm_popup: PropTypes.bool,
  data: PropTypes.object,
  confirmed_data: PropTypes.object,
  set_popup: PropTypes.func,
};

export default MatchPopup;
