import Routebtn from "../ProfileComponents/Routebtn";

const PersonalInfo = () => {
  let button_data = [
    {
      icon_type: "badge",
      heading: "name",
      subheading: "name",
    },
    {
      icon_type: "account_balance",
      heading: "withdrawal code",
      subheading: "set up withdrawal code",
    },
    {
      icon_type: "fingerprint",
      heading: "password",
      subheading: "login password",
    },
    {
      icon_type: "call",
      heading: "phonne number",
      subheading: "phone number",
    },
  ];
  return (
    <div className=" w-full flex-col flex md:ml-[70px] border-2 border-solid border-white">
      <section
        style={{ padding: "4rem 0" }}
        className="grid relative place-content-center"
      >
        <Routebtn
          style={"w-[80vw] max-w-[500px] bg-slate-200 py-[0.25rem]"}
          icon_type={"badge"}
          heading={"personal information"}
          subheading={"name, withdrawal code"}
        />
      </section>
      <section
        style={{ boxShadow: "0 0 8px -2px grey" }}
        className="h-[70vh] overflow-y-auto pb-[10rem] rounded-tl-[2.5rem] px-4 rounded-tr-[2.5rem] bg-slate-200 pt-14"
      >
        {button_data.map((item, idx) => (
          <Routebtn style="py-[0.25rem]" {...item} key={idx} />
        ))}
      </section>
    </div>
  );
};

export default PersonalInfo;
