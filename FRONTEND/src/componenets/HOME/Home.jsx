import { useEffect, useRef, useState } from "react";
import Crousel from "./Crousel";
import Matchcard from "./Matchcard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MatchPopup from "./HomePopups/MatchPopup";
import { useNavigate } from "react-router-dom";

const HomePopup = () => {
  let navigate = useNavigate();
  let [loading, updateLoading] = useState(false);
  let [slice_length, updateSliceLength] = useState({
    start: 0,
    end: 10,
  });
  let matches_box = useRef();
  let [matches, updateMatches] = useState([]);
  let [match_poup, set_popup] = useState(false);
  let [match_clicked, updateClickedMatch] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  let [confirm_popup, update_confirm] = useState(false);
  let [confirmed_data, update_confirm_data] = useState({
    score: "0-0",
    percent: "0.00",
  });

  function set_confirm(toggle, i = 0, score = "0-0", amount = 0) {
    update_confirm(toggle);
    update_confirm_data({
      id: matches[match_clicked].id,
      score: score,
      amount: amount,
      raw_date: matches[match_clicked].date,
      time: matches[match_clicked].time,
      team_a: matches[match_clicked].team_a,
      team_b: matches[match_clicked].team_b,
      date: matches[match_clicked].parsed_date,
      percent: matches[match_clicked].percentages[i],
      leagueName: matches[match_clicked].leagueName,
    });
  }

  useEffect(() => {
    async function get_match_data() {
      updateLoading(true);
      let res = await axiosPrivate("/getliveBet");
      if (!res?.data?.status === "ok") return navigate("/login");
      let match_data = JSON.parse(res.data.data);
      if (!match_data) return navigate("/login");
      let matches = [];
      match_data.forEach((item) => {
        let date = item?.fixture?.date;
        if (!date) {
          return;
        }

        date = new Date(date);
        let time = `${date.getHours()}:${
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }`;
        let parsed_date = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        let timeNow = new Date();

        const timeDifference = date.getTime() - timeNow.getTime();
        if (timeDifference > 5 * 60 * 1000) {
          let match = {
            id: item?.fixture?.id,
            date: item?.fixture?.date,
            leagueName: item?.league?.name,
            team_a: item?.teams?.home?.name,
            team_b: item?.teams?.away?.name,
            time: time,
            team_b_logo: item?.teams?.away?.logo,
            team_a_logo: item?.teams?.home?.logo,
            parsed_date: parsed_date,
            percentages: item?.percentages,
          };
          matches.push(match);
        }
      });
      if (!matches?.length) return;
      let end_value = parseInt(
        (matches.length / 100) * 10 < 10
          ? matches.length
          : (matches.length / 100) * 10
      );
      updateSliceLength({
        start: 0,
        end: end_value,
      });
      console.log(matches.length, slice_length.end);
      updateLoading(false);
      updateMatches(matches);
    }
    get_match_data();
  }, []);

  useEffect(() => {
    let box = matches_box.current;
    function handleScroll() {
      if (box.clientHeight + box.scrollTop >= box.scrollHeight - 10) {
        let update_len =
          parseInt(slice_length.end) + 10 > matches.length
            ? Math.abs(parseInt(matches.length - slice_length.end))
            : 10;

        updateSliceLength((prev) => {
          return { ...prev, end: prev.end + update_len };
        });
      }
    }

    box.addEventListener("scroll", handleScroll);
    return () => {
      box.removeEventListener("scroll", handleScroll);
    };
  }, [matches, slice_length]);

  function setPopup(toggle = true, i) {
    updateClickedMatch(i);
    set_popup(toggle);
  }

  return (
    <>
      <div className=" w-full flex-col flex md:ml-[70px]">
        <div
          style={{ height: "30vh" }}
          className=" h-2/6 grid place-content-center "
        >
          <Crousel />
        </div>
        <div
          id="matches_box"
          ref={matches_box}
          style={{ height: "calc(100vh - 30vh - 60px)" }}
          className=" pb-24 pt-8 px-4 max-h-4/6  overflow-y-auto "
        >
          {matches.length > 2 &&
            matches
              .slice(0, slice_length.end || 10)
              .map((item, i) => (
                <Matchcard
                  key={item.id}
                  index={i}
                  handleClick={setPopup}
                  {...item}
                />
              ))}
          {loading && <h2>LOADING ...</h2>}
        </div>
      </div>
      {match_poup && (
        <MatchPopup
          data={matches[match_clicked]}
          update_confirm_data={update_confirm_data}
          confirmed_data={confirmed_data}
          confirm_popup={confirm_popup}
          set_confirm={set_confirm}
          set_popup={setPopup}
        />
      )}
    </>
  );
};

export default HomePopup;
