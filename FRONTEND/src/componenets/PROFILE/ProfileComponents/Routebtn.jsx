import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
const Routebtn = ({
  icon_type,
  style = "",
  heading,
  subheading,
  link_to,
  handle_click = "",
}) => {
  function btn_clicked() {
    if (handle_click) {
      handle_click();
    }
    return;
  }
  return (
    <Link to={link_to}>
      <div
        onClick={btn_clicked}
        style={{
          gridTemplateColumns: "1fr 3fr 0.5fr",
          gridColumnGap: "0.2rem",
          placeContent: "center",
          boxShadow: " 0 0 10px -3px grey",
        }}
        className={
          "grid rounded-full bg-accentColor text-textColor items-center mb-4 " +
          style
        }
      >
        <div className="grid place-content-center">
          <span
            style={{ fontSize: "2.5rem", color: "#3388ff" }}
            className="material-symbols-outlined"
          >
            {icon_type}
          </span>
        </div>
        <div style={{ lineHeight: "0.8" }} className="py-2">
          <h3 className="uppercase font-bold">{heading}</h3>
          <h5 className=" text-sm capitalize font-semibold">{subheading}</h5>
        </div>
        <div className="grid place-content-center">
          <span
            style={{ fontSize: "2.5rem" }}
            className="material-symbols-outlined"
          >
            chevron_right
          </span>
        </div>
      </div>
    </Link>
  );
};
Routebtn.propTypes = {
  icon_type: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  handle_click: PropTypes.func,
  style: PropTypes.string,
  link_to: PropTypes.string,
};
export default Routebtn;
