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
    console.log("nextSlide");
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
        id="carouselExampleCaptions"
        className="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCrossfade"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full">
            <img src={data[current].image} className="block w-full" alt="..." />
            <div className="carousel-caption hidden md:block absolute text-center">
              <h5 className="text-xl">First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          onClick={prevSlide}
        >
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat "
            aria-hidden="true"
          />
          <span className="visually-hidden ml-4 text-3xl text-white">
            {" "}
            &#10094;
          </span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          onClick={nextSlide}
        >
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          />
          <span className="visually-hidden mr-4 text-3xl text-white">
            {" "}
            &#10095;
          </span>
        </button>
      </div>
      {/* slide count dots */}
      <div className="flex justify-center mt-12 bottom-4 ml-10">
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrent(item.id - 1)}
            className={`${
              current === item.id - 1 ? "bg-gray-600" : "bg-transparent"
            } border border-primary text-white rounded-xl font-medium px-2 hover:bg-transparent hover:text-primary transition mx-2 `}
          >
            &#9679;
          </button>
        ))}
      </div>
    </>
  );
}

export default Banner;
