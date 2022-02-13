import React, { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import { ChromePicker } from "react-color";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("");
  const [oldPrice, setoldPrice] = useState("");
  const [colors, setColors] = useState(["#cfc9c9"]);
  const [color, setColor] = useState("");

  const addColor = (e) => {
    e.preventDefault();
    setColors([...colors, color]);
  };
  const removeColor = (e, index) => {
    e.preventDefault();
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/products", {
        title,
        price,
        img,
        description,
        categories,
        stock,
        size,
        oldPrice,
        colors,
      });
      if (res.data.success) {
        toast.success("Product Added Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setTitle("");
        setPrice("");
        setImg("");
        setDescription("");
        setCategories([]);
        setStock("");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response);
      toast.error("error");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container py-16">
        <div className="mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-3xl uppercase font-medium mb-1 text-center">
            Add Product
          </h2>

          <form action="#" className="relative pb-12">
            <div className="flex justify-between">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Product Name"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="Samsung S21"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Product Name"
                >
                  Price
                </label>
                <input
                  type="number"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="1000"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Product Name"
                >
                  Old Price
                </label>
                <input
                  type="number"
                  className="block line-through w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="2000"
                  onChange={(e) => setoldPrice(e.target.value)}
                  value={oldPrice}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Product Name"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="Your description here..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Product Name"
                >
                  Size
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="S, M, L, XL"
                  onChange={(e) => setSize(e.target.value)}
                  value={size}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Product Name"
                >
                  color
                </label>
                <input
                  type="color"
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                />
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-2 rounded focus:ring-0 focus:outline-none"
                  onClick={(e) => {
                    addColor(e);
                  }}
                >
                  Add Color
                </button>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Product Name"
                >
                  Stock
                </label>
                <input
                  type="number"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="10"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Product Name"
                >
                  Image
                </label>
                <input
                  type="file"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  onChange={(e) => setImg(e.target.files[0].name)}
                />
              </div>
            </div>

            {loading ? (
              <CircularProgress />
            ) : (
              <button
                onClick={addProduct}
                className="absolute right-2 px-4 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium mt-4"
              >
                Add Product
              </button>
            )}
          </form>
          <div>
            {colors.map((color, index) => (
              <div
                style={{
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  margin: "5px",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                <button
                  className="absolute top-0 right-0 text-gray-800  rounded focus:ring-0 focus:outline-none"
                  onClick={(e) => {
                    removeColor(e, index);
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
