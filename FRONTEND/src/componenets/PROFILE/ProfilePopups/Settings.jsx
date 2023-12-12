import Routebtn from "../ProfileComponents/Routebtn";

const Settings = () => {
  return (
    <div className=" w-full flex-col flex md:ml-[70px]">
      <section
        style={{ padding: "4rem 0" }}
        className="grid relative place-content-center"
      >
        <Routebtn
          style={"w-[80vw] max-w-[500px] bg-slate-200 py-[0.25rem]"}
          icon_type={"settings"}
          heading={"settings"}
          subheading={"log out"}
        />
      </section>
      <section
        style={{ boxShadow: "0 0 8px -2px grey" }}
        className="h-[70vh] text-center overflow-y-auto pb-[10rem] rounded-tl-[2.5rem] px-4 rounded-tr-[2.5rem] bg-forgroundColor pt-14"
      >
        <div className="p-4 w-full text-center grid place-content-center">
          <span
            style={{ fontSize: "2.5rem", color: "#3388ff" }}
            className="material-symbols-outlined"
          >
            settings
          </span>
        </div>
        <div
          style={{ margin: "3rem auto 1rem auto" }}
          className="bg-slate-900 text-white font-bold text-xl text-center w-[80%] rounded-full py-4"
        >
          LOGOUT
        </div>
        <h2>Hope you , liked our application.</h2>
      </section>
    </div>
  );
};

export default Settings;
