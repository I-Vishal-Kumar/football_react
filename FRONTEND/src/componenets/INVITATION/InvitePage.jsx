import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/userContext";
const Invite = () => {
  let [url, update_url] = useState("");
  let { userData } = useUserContext();
  useEffect(() => {
    update_url(
      window.location.origin + `/signup/${userData.invitationCode || 0}`
    );
  }, [url, userData]);

  return (
    <div className=" w-full p-4 rounded-md items-center justify-center relative z-10 flex-col flex md:ml-[70px] ">
      <div className="w-[80%] px-8 h-[80%] pt-10 bg-white text-center">
        <div className=" border-b-2 border-dashed border-black py-2">
          <h3 className="text-[1rem]">{url}</h3>
        </div>
        <div className="h-[50%] border-2 border-solid border-black mt-4 mb-4">
          <div id="qrCode"></div>
        </div>
        <div className="text-center hover:bg-sky-600 rounded-md pointer py-3 w-full tracking-wide bg-sky-900 ">
          <h2 className=" text-white">COPY CODE</h2>
        </div>
      </div>
    </div>
  );
};

export default Invite;
