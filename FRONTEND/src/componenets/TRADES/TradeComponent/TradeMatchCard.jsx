import { PropTypes } from "prop-types";
const TradeMatchCard = ({ data, cancel_bet }) => {
  return (
    <div
      style={{ boxShadow: "0 0 10px -3px grey" }}
      className="w-full relative pt-1 mb-6 grid "
    >
      <div className="text-center">
        <h2 className="capitalize">
          {data?.leagueName ? data?.leagueName : "Unavailable"}
        </h2>
      </div>
      <div
        style={{ gridTemplateColumns: "2fr 1fr 2fr", gridTemplateRows: "4rem" }}
        className=" grid items-center text-center "
      >
        <div className="text-start pl-4">
          <h3>{data.team_a ? data.team_a : "Team_a"}</h3>
          <h3>{data.team_b ? data.team_b : "Team_b"}</h3>
        </div>
        <div>LOGO</div>
        <div>
          <h3>{data.date ? data.date : "dd/mm/yyyy"}</h3>
          <h3>{data.time ? data.time : "00.00"}</h3>
        </div>
      </div>
      <div
        style={{ gridTemplateColumns: "1fr 0.5fr 0.5fr 0.5fr" }}
        className="rounded-md grid w-full mt-4 bg-black text-white"
      >
        <div>
          <h4 className="text-transparent">_</h4>
          <h5 className="text-[#00ff00]">FULL TIME</h5>
          <h6 className="text-transparent">RESULT</h6>
        </div>
        <div>
          <h4>SCORE</h4>
          <h5 className="text-[#00ff00]">{data?.score || "0 - 0"}</h5>
          <h5></h5>
        </div>
        <div>
          <h4>PROFIT</h4>
          <h5 className="text-[#00ff00]">{data?.percent || 0.0} %</h5>
          <h6>AVAILABLE</h6>
        </div>
        <div>
          <h4>AMOUNT</h4>
          <h5>{Number(data?.amount) / 100 || 0}</h5>
          <h6 className="text-[#00ff00]">
            {(
              (Number(data?.amount / 100) / 100) *
              Number(data?.percent)
            ).toFixed(2) || 0}
          </h6>
        </div>
      </div>
      {cancel_authorise(data?.raw_date) && (
        <div
          onClick={() => cancel_bet(data?.id || 0, data?.raw_date || 0)}
          className=" cursor-pointer justify-self-end items-center flex mr-3 px-3 mt-1 bg-red-500 rounded-full text-white"
        >
          <span
            style={{ fontSize: "20px" }}
            className="material-symbols-outlined"
          >
            switch_access_shortcut
          </span>
          <h2>CANCEL</h2>
        </div>
      )}
    </div>
  );
};

TradeMatchCard.propTypes = {
  data: PropTypes.object,
  cancel_bet: PropTypes.func,
};

export default TradeMatchCard;

function cancel_authorise(date) {
  let today = new Date();
  let match_date = new Date(date);
  if (match_date.getTime() - today.getTime() > 5 * 60 * 1000) {
    return true;
  } else {
    return false;
  }
}
