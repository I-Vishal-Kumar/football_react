import AffiliateCard from "../ProfileComponents/AffiliateCard";
import { PropTypes } from "prop-types";

const AffiliatePopups = ({ handlePopup, data }) => {
  return (
    <section className="h-full z-10 w-full absolute top-0 left-0 bg-backgroundColor">
      {/* popup close button */}
      <div className="py-2 flex items-center justify-end">
        <span
          onClick={() => handlePopup(false)}
          className="pr-[30%] py-2 bg-accentColor flex rounded-tl-full rounded-bl-full"
        >
          <span
            style={{ color: "#FFF", fontSize: "2rem" }}
            className="material-symbols-outlined"
          >
            arrow_back_ios_new
          </span>
        </span>
      </div>
      <div>
        <section className="px-4 py-2">
          <div
            style={{ columnGap: "0.5rem" }}
            className="px-8 grid  grid-cols-2 text-center place-content-center py-4 rounded-full bg-accentColor"
          >
            <h3 className="bg-forgroundColor  rounded-full py-3">
              TOTAL MEMBER
            </h3>
            <h3 className="bg-forgroundColor rounded-full  py-3">
              TOTAL {data?.topic}
            </h3>
          </div>
          <div className="grid place-content-center py-2 bg-accentColor grid-cols-2 text-center rounded-full">
            <h3>000</h3>
            <h3>000</h3>
          </div>
        </section>
        <section className="h-[70vh] overflow-y-auto rounded-tr-[2rem] rounded-tl-[2rem] p-4 mt-3 bg-white">
          <div
            style={{ columnGap: "0.5rem" }}
            className="grid grid-cols-3 text-center px-8"
          >
            <h3 className="bg-buttonColor text-white rounded-full py-3">
              ACCOUNT
            </h3>
            <h3 className="bg-buttonColor text-white rounded-full py-3">
              LEVEL
            </h3>
            <h3 className="bg-buttonColor text-white rounded-full py-3">BET</h3>
          </div>
          <div
            style={{ columnGap: "0.5rem" }}
            className=" flex flex-col items-center overflow-y-auto pb-[10rem] text-center h-[80%] max-h-[80%] mt-4 rounded-md bg-forgroundColor"
          >
            {data?.data?.map((item, idx) => (
              <AffiliateCard key={idx} data={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

AffiliatePopups.propTypes = {
  data: PropTypes.object,
  handlePopup: PropTypes.func,
};

export default AffiliatePopups;
