import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";

function AllProducts() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let { data } = await Axios.get("/products");
    setProducts(data.doc);
  };
  const deleteItem = async (id, item) => {
    if (window.confirm(`Are you sure you want to delete ${item}?`)) {
      try {
        let res = await Axios.delete(`/products/${id}`);
        getProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <h1 className="text-3xl text-center font-bold my-4">All Products </h1>
      <div className="flex flex-wrap justify-center">
        <table className="table-auto w-full ">
          <thead>
            <tr>
              <th className="px-4 py-2"> Name</th>
              <th className="px-4 py-2"> Price</th>
              <th className="px-4 py-2"> Old Price </th>
              <th className="px-4 py-2"> Image</th>
              <th className="px-4 py-2"> Description</th>
              <th className="px-4 py-2"> Categories </th>
              <th className="px-4 py-2"> stock </th>
              <th className="px-4 py-2"> Edit </th>
              <th className="px-4 py-2"> Delete </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2">$ {product.price}</td>
                <td className="border px-4 py-2 line-through">
                  $ {product.oldPrice}
                </td>
                <td className="border px-4 py-2">
                  <img src={product.img} alt="product" />
                </td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">{product.categories}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="bg-blue-400 ml-4 hover:bg-blue-200 text-white hover:text-gray-600 font-bold py-2 px-4 rounded transition"
                  >
                    Edit
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteItem(product._id, product.title)}
                    className="bg-red-400 ml-4 hover:bg-red-200 text-white hover:text-gray-600 font-bold py-2 px-4 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProducts;
