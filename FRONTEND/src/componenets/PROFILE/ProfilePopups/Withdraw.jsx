import Card from "../ProfileComponents/Card";
import { Link } from "react-router-dom";
const Withdraw = () => {
  return (
    <div className=" w-full flex-col flex md:ml-[70px] bg-backgroundColor">
      <section
        style={{ padding: "1rem 0" }}
        className="grid relative place-content-center"
      >
        <div className="text-center">
          <div className="h-[100px] rounded-full aspect-square border-2 border-solid border-white ">
            h
          </div>
          <h3 className="text-white font-bold ">Name</h3>
        </div>
      </section>
      <section
        style={{ boxShadow: "0 0 8px -2px grey" }}
        className="h-[70vh] overflow-y-auto pb-[10rem] rounded-tl-[2.5rem] px-4 rounded-tr-[2.5rem] bg-forgroundColor pt-4"
      >
        <div className="flex font-bold text-xl w-full justify-center py-4 mt-4">
          <span
            style={{ width: "90%", letterSpacing: "1px" }}
            className="rounded-full grid place-content-center text-white font-bold px-8 h-10  text-center bg-blue-600"
          >
            <h2>WITHDRAW</h2>
          </span>
        </div>
        {/* visa card */}
        <div className="w-full flex justify-center py-2">
          <div className="w-[80%] max-w-[500px] rounded-md">
            <Card />
          </div>
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
        <div className=" mt-12 relative ">
          <input
            type="number"
            className="rounded-full font-bold text-lg w-[95%] py-4 px-8"
          />
          <span className=" tracking-[1.5px] absolute uppercase bg-gray-950 text-white right-16 px-4 py-1 bottom-full rounded-tr-lg rounded-tl-lg">
            WITHDRAW CODE
          </span>
        </div>

        <div className="grid mt-8 grid-cols-2 gap-3">
          <div className=" bg-buttonColor rounded-full text-center p-4 text-white">
            REQUEST
          </div>
          <Link to={"../profile"}>
            <div className="rounded-full text-center p-4">CANCEL</div>
          </Link>
        </div>
        <div className="text-center tracking-wide font-semibold mt-10 text-black">
          <h1>WITHDRAW FEE : 10%</h1>
          <h1>PER DAY 1 WITHDRAWAl.</h1>
        </div>
      </section>
    </div>
  );
};

export default Withdraw;
