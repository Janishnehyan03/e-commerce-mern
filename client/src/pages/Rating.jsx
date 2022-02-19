import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../src/Axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import {UserAuthContext} from "../context/UserAuth";
import { useContext } from "react";

function RatingComponent() {
  const { authData } = useContext(UserAuthContext);
  const user = authData;
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewed, setReviewed] = useState(false);
  const params = useParams();
  const productId = params.id;
  const checkReviewed = async () => {
    const response = await Axios.get(`/reviews/check-review/${productId}`);
    if (response.data.review) {
      setReviewed(true);
    }
  };
  const getProductReviews = async () => {
    try {
      const response = await Axios.get(`/reviews/${productId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let res = await Axios.post(`/reviews/${productId}`, {
        rating: rating,
        review,
      });
      setReview("");
      setRating(3);
      getProductReviews();
    } catch (error) {
      console.log(error);
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  const deleteReview = async (reviewId) => {
    try {
      if (window.confirm("Are you sure?")) {
        await Axios.delete(`/reviews/${reviewId}`);
        getProductReviews();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getProductReviews();
  }, []);
  useEffect(() => {
    user && checkReviewed();
  }, [productId]);
  return (
    <div className="grid grid-cols-6 gap-2">
      <ToastContainer />
      {reviews.map((review, index) => (
        <div className="col-start-2 col-span-2 items-center shadow-lg mb-4 mt-4">
          {/* delete icon */}
          <div className="flex justify-end mx-10">
            <i
              onClick={() => deleteReview(review._id)}
              className="fas fa-trash-alt text-red-500 cursor-pointer"
            ></i>
          </div>
          <div className="flex flex-wrap mb-6 relative">
            <img
              className="rounded-2xl shadow-lg w-12 h-12 mx-auto mb-2 absolute left-0"
              src="https://picsum.photos/200/300"
              alt=""
            />
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg ml-36">
              {review.userId.username}
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <p className="px-4 pt-3 pb-2 text-gray-800 text-md">
                {review.review}
              </p>
            </div>
            {/* star rating with rating count */}
            <div className="ml-12 mt-8 flex gap-1 text-sm text-yellow-400">
              {[...Array(review.rating)].map((star, i) => (
                <svg
                  key={i}
                  className="h-4 w-4 fill-current text-yellow-400 mr-1"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.832-8.718-7.416-5.389h9.167z"
                  />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap mb-2 relative">
            <small className="px-4 pt-3 text-gray-800 text-sm ml-36">
              {moment(review.createdAt).format("MMMM Do YYYY")}
            </small>
          </div>
        </div>
      ))}
      {user && !reviewed && (
        <div className="col-end-7 col-span-2 items-center justify-center shadow-lg mb-4 max-w-lg mt-4">
          <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
            <div className="flex flex-wrap mx-3 mb-6 relative">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg ml-36">
                Post your review here
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Good product"
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                />
              </div>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <select
                  onChange={(e) => setRating(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value={1}>Bad</option>
                  <option value={2}>Not good </option>
                  <option selected value={3}>
                    Good
                  </option>
                  <option value={4}>Better</option>
                  <option value={5}>Best</option>
                </select>
              </div>
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute right-8"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RatingComponent;
