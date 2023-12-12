import { PropTypes } from "prop-types";
const Matchcard = ({
  leagueName,
  index,
  team_a,
  team_b,
  parsed_date,
  time,
  handleClick,
}) => {
  function cardClick() {
    handleClick(true, index);
  }
  return (
    <div
      className="w-full pt-1 px-4 bg-forgroundColor shadow-md mb-3"
      onClick={cardClick}
    >
      <div className="text-center">
        <h3>{leagueName ? leagueName : "Test"}</h3>
      </div>
      <div
        style={{ gridTemplateColumns: "2fr 1fr 2fr", gridTemplateRows: "4rem" }}
        className=" grid items-center text-center gap-x-4 "
      >
        <div className="text-start overflow-x-hidden">
          <h3 className="whitespace-nowrap overflow-x-hidden">
            {team_a ? team_a : "Team_a"}
          </h3>
          <h3 className="whitespace-nowrap overflow-x-hidden">
            {team_b ? team_b : "Team_b"}
          </h3>
        </div>
        <div>LOGO</div>
        <div>
          <h3>{parsed_date ? parsed_date : "Today"}</h3>
          <h3>{time ? time : "00.00"}</h3>
        </div>
      </div>
    </div>
  );
};
Matchcard.propTypes = {
  leagueName: PropTypes.string.isRequired,
  team_a: PropTypes.string.isRequired,
  team_b: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  parsed_date: PropTypes.string,
  time: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  index: PropTypes.number,
};
export default Matchcard;
