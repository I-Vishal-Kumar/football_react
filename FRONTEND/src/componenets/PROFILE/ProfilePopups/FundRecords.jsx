import FundCard from "../ProfileComponents/FundCard";

const PersonalInfo = () => {
  return (
    <div className=" overflow-y-auto w-full flex-col flex md:ml-[70px] border-2 border-solid border-white">
      <section
        style={{ padding: "1rem 0", boxSizing: "border-box" }}
        className=" h-[90vh] flex flex-col items-center bg-backgroundColor"
      >
        <div className="rounded-full bg-slate-400 h-content w-[80%] py-2 px-4 text-center">
          <h2
            style={{ margin: "0 auto" }}
            className="bg-gray-900 text-white px-5 w-[70%] rounded-full py-1 "
          >
            FUNDS
          </h2>
        </div>
        <div className="records w-[90%]  pb-[10rem] h-full bg-backgroundColor overflow-y-auto mt-4 ">
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
          <FundCard />
        </div>
      </section>
    </div>
  );
};

export default PersonalInfo;
