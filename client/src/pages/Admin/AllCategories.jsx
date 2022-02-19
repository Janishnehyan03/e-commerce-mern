import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";

function AllCategories() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      let { data } = await Axios.get("/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = async (id, item) => {
    if (window.confirm(`Are you sure you want to delete ${item}?`)) {
      try {
        let res = await Axios.delete(`/categories/${id}`);
        getCategories();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex flex-col">
      <Link
        to={"/add-category"}
        class=" cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center absolute right-2 my-4"
      >
        Add Category
      </Link>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Delete
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                          <img
                            className="rounded-md"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500">{product._id}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/edit-category/${product._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        to={`/admin/edit-product/${product._id}`}
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteItem(product._id, product.name)}
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
      </div>
    </div>
  );
}

export default AllCategories;
