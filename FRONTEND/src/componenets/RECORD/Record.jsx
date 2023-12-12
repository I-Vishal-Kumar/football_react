import RecordMatchCard from "./RecordComponenet/RecordMatchCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";

const Record = () => {
  const { getAlert } = useAlert();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  let [data, setData] = useState([]);
  useEffect(() => {
    async function getOngoingMatches() {
      try {
        let res = await axiosPrivate("getBetHistory");

        if (res?.data?.data) {
          setData(res?.data?.data);
        } else {
          getAlert("something went wrong");
        }
      } catch (error) {
        if (error.status === 401 || error.status === 403) navigate("/login");
        getAlert(error?.response?.message);
      }
    }

    getOngoingMatches();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <div className=" relative z-10 w-full bg-accentColor flex-col flex md:ml-[70px]">
      {/* avatar section */}
      <section
        style={{ padding: "4rem 0" }}
        className="grid relative bg-accentColor place-content-center"
      ></section>
      {/* Record navigators */}
      <section
        style={{
          borderRadius: "2.5rem 2.5rem 0 0 ",
          height: "75dvh",
          paddingBottom: "10rem",
        }}
        className=" pt-6 font-bold text-center bg-forgroundColor"
      >
        <h1>RECORDS</h1>
        <div className="p-4 overflow-y-auto h-[75dvh] pb-[10rem] ">
          {data.map((item) => (
            <RecordMatchCard key={item._id} data={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Record;
