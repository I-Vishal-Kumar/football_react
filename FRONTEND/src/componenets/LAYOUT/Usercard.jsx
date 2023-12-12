import { useUserContext } from "../../hooks/userContext";
const Usercard = () => {
  let { userData } = useUserContext();
  return (
    <div className=" px-4 py-2 pb-12 rounded-md bg-slate-500 flex flex-col ">
      <div className="w-full p-2 grid place-content-center border-2 border-solid border-orange-300">
        <img
          src=""
          className=" h-36 border-2 border-solid border-orange-300 aspect-square"
          alt="n"
        />
      </div>

      {/* user data */}
      <div className="mt-4">
        <ul>
          <li className="flex px-5 justify-between py-2 border-b-2 border-blue-500 ">
            <h3>Name</h3>
            <h3>{userData.name || "not available"}</h3>
          </li>
          <li className="flex px-5 justify-between py-2 border-b-2 border-blue-500 ">
            <h3>Profit</h3>
            <h3>{(userData.profits / 100 || 0).toFixed(2)}</h3>
          </li>
          <li className="flex px-5 justify-between py-2 border-b-2 border-blue-500 ">
            <h3>Members</h3>
            <h3>{userData.members || 0}</h3>
          </li>
          <li className="flex px-5 justify-between py-2 border-b-2 border-blue-500 ">
            <h3>Withdrawals</h3>
            <h3>{userData.withdraws || 0}</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Usercard;