import { Link } from "react-router-dom";
const Deposit = () => {
  return (
    <div className=" w-full flex-col bg-backgroundColor flex md:ml-[70px] ">
      <section
        style={{ padding: "1rem 0" }}
        className="grid relative place-content-center bg-backgroundColor"
      >
        <div className="text-center">
          <div className="h-[100px] rounded-full aspect-square bg-blue-400 ">
            h
          </div>
          <h3 className="text-white font-bold ">Name</h3>
        </div>
      </section>
      <section className="h-[70vh] overflow-y-auto pb-[10rem] rounded-tl-[2.5rem] px-4 rounded-tr-[2.5rem] bg-forgroundColor pt-4">
        <div className="flex font-bold text-xl w-full justify-between py-4 mt-4">
          <span
            style={{ width: "45%", letterSpacing: "1px" }}
            className="rounded-full grid place-content-center text-white font-bold px-8 h-10  text-center bg-blue-600"
          >
            <h2>UPI</h2>
          </span>
          <span
            style={{ width: "45%", letterSpacing: "1px" }}
            className="rounded-full grid place-content-center text-white font-bold w-2/5 px-8 h-10  text-center bg-blue-600"
          >
            <h2>USDT</h2>
          </span>
        </div>
        <div className=" mt-12 relative ">
          <input
            type="number"
            className="rounded-full font-bold text-lg w-[95%] py-4 px-8"
          />
          <span className=" tracking-[1.5px] absolute uppercase bg-gray-950 text-white left-8 px-4 py-1 bottom-full rounded-tr-lg rounded-tl-lg">
            AMOUNT
          </span>
        </div>

        {/* amounts */}
        <div className="grid mt-8 grid-rows-2 font-bold text-[1.14rem] gap-3 grid-cols-2">
          <div className="rounded-full p-4 bg-blue-600 text-white text-center">
            1000
          </div>
          <div className="rounded-full p-4 bg-blue-600 text-white text-center">
            2000
          </div>
          <div className="rounded-full p-4 bg-blue-600 text-white text-center">
            5000
          </div>
          <div className="rounded-full p-4 bg-blue-600 text-white text-center">
            10000
          </div>
        </div>
        <div className="grid mt-8 grid-cols-2 gap-3">
          <div className=" bg-gray-900 rounded-full text-center p-4 text-white">
            REQUEST
          </div>
          <Link to={"../profile"}>
            <div className="rounded-full text-center p-4">CANCEL</div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Deposit;
