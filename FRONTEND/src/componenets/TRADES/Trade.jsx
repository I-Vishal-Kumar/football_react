import TradeMatchCard from "./TradeComponent/TradeMatchCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
const Trade = () => {
  let [data, setData] = useState([]);
  const { getAlert } = useAlert();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function getOngoingMatches() {
      try {
        let res = await axiosPrivate("ongoingBet");
        if (res?.data?.data) {
          setData(res?.data?.data);
        }
      } catch (error) {
        getAlert(error.message);
      }
    }

    getOngoingMatches();
    return () => {
      setData([]);
    };
  }, []);

  async function cancelOngoingBet(id, raw_date) {
    if (id === 0) getAlert("something went wrong");
    try {
      let res = await axiosPrivate.post("deleteBet", {
        id,
        raw_date,
      });
      getAlert(res?.data?.message || "something went wrong");
    } catch (error) {
      console.log(error);
      if (error.status === 401 || error.status === 403) navigate("/login");
      getAlert(error?.response?.data?.message || "something went wrong");
    }
  }

  return (
    <div className=" relative z-10 w-full bg-accentColor flex-col flex md:ml-[70px]">
      {/* avatar section */}
      <section
        style={{ padding: "4rem 0" }}
        className="grid relative bg-accentColor place-content-center"
      ></section>
      {/* Trade navigators */}
      <section
        style={{
          borderRadius: "2.5rem 2.5rem 0 0 ",
          height: "75dvh",
          paddingBottom: "10rem",
        }}
        className=" pt-6 font-bold text-center bg-backgroundColor"
      >
        <h1>TRADES</h1>
        <div className="p-4 overflow-y-auto h-[75dvh] pb-[10rem] ">
          {data.map((item) => (
            <TradeMatchCard
              key={item._id}
              data={item}
              cancel_bet={cancelOngoingBet}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Trade;
