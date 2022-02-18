import React from "react";

function Banner() {
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center py-36"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/front-view-woman-with-shopping-bag-concept_23-2148674158.jpg?w=1380')",
        }}
      >
        <div className="container mx-36">
          <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
            best collections <br /> for home decoration
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br />{" "}
            Beatae velit quia iure odit nostrum rem illo deserunt praesentium
          </p>
          <div className="mt-12">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
