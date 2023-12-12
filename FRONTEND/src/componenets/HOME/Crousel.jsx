import { useEffect, useState } from "react";
import promotion_1 from "./HomeAssets/INVITE.jpg";
import promotion_2 from "./HomeAssets/SALARY.jpg";
import promotion_3 from "./HomeAssets/promotion_6.jpg";
import promotion_4 from "./HomeAssets/promotion_7.jpg";

function Crousel() {
  let [currentIndex, updateIndex] = useState(0);
  const items = [
    {
      position: 0,
      image: promotion_1,
    },
    {
      position: 1,
      image: promotion_2,
    },
    {
      position: 2,
      image: promotion_3,
    },
    {
      position: 3,
      image: promotion_4,
    },
  ];

  useEffect(() => {
    function crousel_controls(idx) {
      if (idx < 0) {
        idx = items.length - 1;
      } else if (idx > items.length - 1) {
        idx = 0;
      }
      updateIndex(idx);
    }

    const crousel_updator = setInterval(() => {
      crousel_controls(currentIndex + 1);
    }, 5000);

    return () => clearInterval(crousel_updator);
  }, [currentIndex, items.length]);

  return (
    <>
      <div className=" relative max-w-fit h-[30vh] ">
        <div
          style={{
            height: "100%",
            transition: "all ease 0.3s",
            minWidth: "min(32rem , 90vw)",
            maxWidth: "min(32rem , 90vw)",
          }}
          className=" overflow-hidden flex py-2"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                transition: "0.4s",
                height: "100%",
                transform: `translateX(-${currentIndex * 100}%)`,
                minWidth: "min(32rem , 90vw)",
                background: `url(${item.image}) center no-repeat`,
                backgroundSize: "contain",
              }}
            >
              {/* <img src={item.image} className="h-[30vh] w-full" alt="testing" /> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Crousel;
