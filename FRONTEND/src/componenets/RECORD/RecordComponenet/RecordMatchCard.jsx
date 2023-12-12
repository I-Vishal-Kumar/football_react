import { PropTypes } from "prop-types";
const RecordMatchCard = ({ data }) => {
  return (
    <div
      style={{ boxShadow: "0 0 10px -3px grey" }}
      className="w-full bg-accentColor pt-1 mb-6 "
    >
      <div className="text-center">
        <h3>{data.leagueName ? data.leagueName : "Test"}</h3>
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
          <h3>{data.date ? data.date : "Today"}</h3>
          <h3>{data.time ? data.time : "00.00"}</h3>
        </div>
      </div>
      <div
        style={{ gridTemplateColumns: "1fr 0.5fr 0.5fr 0.5fr" }}
        className="rounded-md grid w-full mt-4 bg-buttonColor text-textColor"
      >
        <div>
          <h4 className="text-transparent">_</h4>
          <h5 className="text-[#00ff00]">FULL TIME</h5>
          <h6>RESULT</h6>
        </div>
        <div>
          <h4>SCORE</h4>
          <h5 className="text-[#00ff00]">{data?.score || "0- 0"}</h5>
          <h5>-1 - -1</h5>
        </div>
        <div>
          <h4>PROFIT</h4>
          <h5 className="text-[#00ff00]">{data?.percent || 0}%</h5>
          <h6>AVAILABLE</h6>
        </div>
        <div>
          <h4>AMOUNT</h4>
          <h5>{Number(data?.amount) / 100}</h5>
          <h6 className="text-[#00ff00]">
            {((Number(data.amount) / 10000) * Number(data?.percent)).toFixed(
              2
            ) || "0"}
          </h6>
        </div>
      </div>
    </div>
  );
};
RecordMatchCard.propTypes = {
  data: PropTypes.object,
};
export default RecordMatchCard;
