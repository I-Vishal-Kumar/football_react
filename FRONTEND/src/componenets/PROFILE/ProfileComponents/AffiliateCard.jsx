import { PropTypes } from "prop-types";

const AffiliateCard = ({ data }) => {
  return (
    <div className="grid mt-3 pt-4 pb-1 border-b-2 border-white w-[95%] grid-cols-3 text-center">
      <h3 className="capitalize">testing</h3>
      <h3 className="uppercase">LEVEl {data?.level || 1}</h3>
      <h3>{data?.value || 0}</h3>
    </div>
  );
};

AffiliateCard.propTypes = {
  data: PropTypes.object,
};
export default AffiliateCard;
