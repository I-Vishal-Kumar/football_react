const FundCard = () => {
  return (
    <div
      style={{ margin: "1rem auto" }}
      className=" bg-accentColor  w-[90%] rounded-xl p-2 mt-4"
    >
      <div className="flex justify-between">
        <h3>WITHDRAWAL</h3>
        <div className="flex items-center">
          <h2 className="h-4 mr-2 aspect-square bg-yellow-400 rounded-full"></h2>
          <span>pending</span>
        </div>
      </div>
      <div className="grid py-1 px-4 place-content-center grid-cols-3">
        <h3 className="text-start">100</h3>
        <h3 className="text-center">fskdjf</h3>
        <h3 className="text-end">11/11/2023</h3>
      </div>
    </div>
  );
};

export default FundCard;
