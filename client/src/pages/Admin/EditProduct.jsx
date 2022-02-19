import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import { ChromePicker } from "react-color";

export default function EditProduct() {
  const paramsId = window.location.pathname.split("/")[3];
  const [product, setProduct] = useState([]);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [img, setImg] = useState(product.img);
  const [description, setDescription] = useState(product.description);
  const [categories, setCategories] = useState(product.categories);
  const [stock, setStock] = useState(product.stock);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(product.size);
  const [oldPrice, setoldPrice] = useState(product.oldPrice);
  const [colors, setColors] = useState(product.colors);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const getProduct = async () => {
    let { data } = await Axios.get(`/products/${paramsId}`);
    setProduct(data.product);
    setTitle(data.product.title);
    setPrice(data.product.price);
    setImg(data.product.img);
    setDescription(data.product.description);
    setCategories(data.product.categories);
    setStock(data.product.stock);
    setSize(data.product.size);
    setoldPrice(data.product.oldPrice);
    setColors(data.product.colors);
  };

  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.patch(`/products/${paramsId}`, {
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
      if (res.status === 200) {
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
      console.log(error);
      toast.error("error");
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="justify-center items-center flex  outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Edit Products</h3>
            <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4">
              <div className="flex">
                <div className="mb-4 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Product Name"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Product Name"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div className="mb-4 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Product Name"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary "
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>
                <div className="mb-4 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Product Name"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary "
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="mb-4 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Product Name"
                  >
                    Categories
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary "
                    onChange={(e) => setCategories(e.target.value)}
                    value={categories}
                  />
                </div>
                <div className="mb-4 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Product Name"
                  >
                    Stock
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary "
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </div>

                {/* <div className="mb-4 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Product Name"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    className="block w-44 border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary "
                    onChange={(e) => setImg(e.target.files[0])}
                    value={img}
                  />
                </div> */}
              </div>
              <button
                onClick={(e) => editProduct(e)}
                className="bg-green-300 py-4 px-8 rounded-md text-white font-bold uppercase hover:bg-white hover:text-green-500 hover:border-2 transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
