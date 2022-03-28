import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import { UserAuthContext } from "../context/UserAuth";

function ProductView({ cartOpen, setCartOpen }) {
  // console params from url
  const [product, setProduct] = useState({});
  const { addToCart, cartDetails, getCart } = useContext(CartDetailsContext);
  const { authData } = useContext(UserAuthContext);
  const history = useHistory();

  const params = useParams();
  const productId = params.id;
  const getProduct = async () => {
    try {
      let res = await Axios.get(`/products/${productId}`);
      if (res.status === 200) {
        setProduct(res.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const goToCart = () => {
    setCartOpen(!cartOpen);
  };
  useEffect(() => {
    getProduct();
    getCart();
  }, []);
  return (
    <>
      <ToastContainer />
      {/* breadcrumb */}
      <div className="container py-4 flex items-center  gap-3">
        <a href="/" className="text-primary text-base">
          <i className="fas fa-home"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fas fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Product View Page</p>
      </div>
      {/* breadcrumb */}

      {/* product view */}
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <img src={product.img} alt="" className="w-full" />
        </div>
        {/* product content */}
        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {product.title}
          </h2>
          <div className="flex items-center mb-4">
            <Link to={`/rating/${product._id}`}>
              <div className="flex gap-1 text-sm text-yellow-400">
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
              </div>
            </Link>
            <div className="text-xs text-gray-500 ml-3">(150 reviews)</div>
          </div>
          <div>
            {/* show out of stock and only 5 items stock if stock less than 5 */}
            {product.stock === 0 ? (
              <></>
            ) : product.stock < 6 ? (
              <p className="text-red-400 text-center">
                only {product.stock} left
              </p>
            ) : (
              <p className="text-green-400 text-center">in stock</p>
            )}
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand:</span>
              <span className="text-gray-600">Apex</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category:</span>
              <span className="text-gray-600">Sofa </span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU :</span>
              <span className="text-gray-600">BEKFIHHDK</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-5">
            <p className="text-2xl text-primary font-semibold">$ 595.00</p>
            <p className="text-base text-gray-400 line-through">$ 695.00</p>
          </div>
          <p className="mt-4">{product.description}</p>

          {/* add to cart */}
          <div className="pt-4 mt-8">
            {product.stock <= 0 ? (
              <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg">
                Out of Stock
              </button>
            ) : (
              <>
                {cartDetails.find(
                  (cartItem) => cartItem._id === product._id
                ) ? (
                  <button
                    onClick={() => goToCart()}
                    className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Go to cart{" "}
                  </button>
                ) : (
                  <>
                    {authData && (
                      <button
                        onClick={() => addToCart(product._id, product.title)}
                        className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-600"
                      >
                        Add To Cart
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {/* add to cart */}

          {/* social share */}
          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              share
            </h3>
            <div className="flex items-center gap-2">
              <div className="social-share-selector text-xl border border-gray-300 rounded-full px-2 py-1 hover:bg-gray-700 hover:cursor-pointer group ">
                <i className="fab fa-facebook-f text-gray-600 group-hover:text-white"></i>
              </div>
              <div className="social-share-selector text-xl border border-gray-300 rounded-full px-2 py-1 hover:bg-gray-700 hover:cursor-pointer group">
                <i className="fab fa-twitter text-gray-600 hover:text-white transition"></i>
              </div>
              <div className="social-share-selector text-xl border border-gray-300 rounded-full px-2 py-1 hover:bg-gray-700 hover:cursor-pointer group">
                <i className="fab fa-instagram text-gray-600 hover:text-white transition"></i>
              </div>
              <div className="social-share-selector text-xl border border-gray-300 rounded-full px-2 py-1 hover:bg-gray-700 hover:cursor-pointer group">
                <i className="fab fa-pinterest text-gray-600 hover:text-white transition"></i>
              </div>
            </div>
          </div>

          {/* social share */}
        </div>

        {/* product details */}
        <div>
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            product details
          </h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
            facere! Ad minus, quae, officia dolores assumenda totam rerum
            repudiandae recusandae natus rem fuga autem dolorum sunt sapiente?
            Iure, earum perferendis. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Beatae, facere! Ad minus, quae, officia dolores
            assumenda totam rerum repudiandae recusandae natus rem fuga autem
            dolorum sunt sapiente? Iure, earum perferendis. Lorem ipsum dolor
            sit amet consectetur, adipisicing elit. Beatae, facere! Ad minus,
            quae, officia dolores assumenda totam rerum repudiandae recusandae
            natus rem fuga autem dolorum sunt sapiente? Iure, earum perferendis.
          </p>

          {/* table */}
          <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  color
                </th>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  material
                </th>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="py-2 px-4 border border-gray-300">
                  Black, brown
                </th>

                <th className="py-2 px-4 border border-gray-300">Leather</th>

                <th className="py-2 px-4 border border-gray-300">55 Kg</th>
              </tr>
            </tbody>
          </table>
          {/* table */}
        </div>

        {/* product details */}

        {/* product content */}
      </div>
      {/* product view */}
    </>
  );
}

export default ProductView;
