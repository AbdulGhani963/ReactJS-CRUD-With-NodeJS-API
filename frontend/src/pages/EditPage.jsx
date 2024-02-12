import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
  });

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/products/${id}`
      );
      setProduct({
        name: response.data.name,
        price: response.data.price,
        quantity: response.data.quantity,
        image: response.data.image,
      });
      setIsLoading(false);
    } catch (error) {
      toast.error(error.mesage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const nameUpdateHandler = (event) => {
    setProduct({ ...product, name: event.target.value });
  };
  const priceUpdateHandler = (event) => {
    setProduct({ ...product, price: event.target.value });
  };
  const quantityUpdateHandler = (event) => {
    setProduct({ ...product, quantity: event.target.value });
  };
  const imageUpdateHandler = (event) => {
    setProduct({ ...product, image: event.target.value });
  };

  const productUpdateHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      await axios.put(`${VITE_BACKEND_URL}/api/products/${id}`, product);
      toast.success(`Update a product successfully`);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-6 rounded mt-2">
      <h2 className="font-bold text-2xl mb-4 block text-center">
        Update a Product
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={productUpdateHandler}>
            <div className="space-y-2">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={nameUpdateHandler}
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400"
                  placeholder="Enter Name"
                />
              </div>
              <div>
                <label className="font-medium">Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={priceUpdateHandler}
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400"
                  placeholder="Enter Price"
                />
              </div>
              <div>
                <label className="font-medium">Quantity</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={quantityUpdateHandler}
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400"
                  placeholder="Enter Quantity"
                />
              </div>
              <div>
                <label className="font-medium">Image URL</label>
                <input
                  type="text"
                  value={product.image}
                  onChange={imageUpdateHandler}
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400"
                  placeholder="Enter Image URL"
                />
              </div>
              <div>
                {!isLoading && (
                  <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-3 font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Update
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
export default EditPage;
