import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Banner() {
  const [current, setCurrent] = useState(0);
  const data = [
    {
      id: 1,
      title: "Your best collections",
      image:
        "https://img.freepik.com/free-photo/front-view-woman-with-shopping-bag-concept_23-2148674158.jpg?t=st=1645364505~exp=1645365105~hmac=8d62411000163ebfa84c7bf92c92f930f7111870e033c1d2eddbcf44df6e0feb&w=1380",
      description: "Lorem ipsum lorem ipsumfj kjfdsore ",
    },
    {
      id: 2,
      title: "Your best collections",
      image:
        "https://img.freepik.com/free-photo/phone-with-black-friday-inscription-table_23-2147957608.jpg?t=st=1645364573~exp=1645365173~hmac=10a8af000b8d7d189753880388435f4542126b0c1897746bf77fc325c967a32c&w=1380",
      description: "Lorem ipsum lorem ipsumfj kjfdsore ",
    },
    {
      id: 3,
      title: "Your best collections",
      image:
        "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?t=st=1645364425~exp=1645365025~hmac=61e585d5ce46ddea67443ec5645221bbbc0be367e65b93cc02b47fe2431b6286&w=1380",
      description: "Lorem ipsum lorem ipsumfj kjfdsore ",
    },
    {
      id: 4,
      title: "Your best collections",
      image:
        "https://img.freepik.com/free-photo/top-view-black-friday-sales-assortment-with-copy-space_23-2148665597.jpg?t=st=1645364584~exp=1645365184~hmac=20cbf7e4520d3eb950c548d4aa255d38eb0b9fd0d8b8061122d16beee444c9ee&w=1380",
      description: "Lorem ipsum lorem ipsumfj kjfdsore ",
    },
  ];

  const nextSlide = () => {
    if (current === data.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };
  const prevSlide = () => {
    if (current === 0) {
      setCurrent(data.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center py-36 relative"
        style={{
          backgroundImage: "url(" + data[current].image + ")",
        }}
      >
        <div className="container mx-36">
          <h1 className="text-6xl text-white font-medium mb-4 capitalize">
            {data[current].title}
          </h1>
          <p className="text-white text-xl font-medium mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, quisquam.
          </p>
          <div className="mt-12">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition"
            >
              Shop Now
            </a>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-60 mt-4 mr-4 text-3xl text-white font-medium"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-60 mt-4 text-3xl text-white font-medium"
          >
            &#10095;
          </button>
        </div>
        {/* slide count dots */}
        <div className="flex justify-center mt-12 absolute bottom-4 left-96 ml-10">
          {data.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrent(item.id - 1)}
              className={`${
                current === item.id - 1 ? "bg-primary" : "bg-transparent"
              } border border-primary text-white rounded-2xl font-medium px-2 hover:bg-transparent hover:text-primary transition mx-2 `}
            >
              &#9679;
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Banner;
