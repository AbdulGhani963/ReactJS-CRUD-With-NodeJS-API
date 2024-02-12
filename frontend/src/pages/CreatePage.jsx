import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const imageHandler = (event) => {
    setImage(event.target.value);
  };

  const productSaveHandler = async (event) => {
    event.preventDefault();
    if (
      name.trim() === "" ||
      price === "" ||
      quantity === "" ||
      image.trim() === ""
    ) {
      alert("Please fill out all input completely");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${VITE_BACKEND_URL}/api/products`, {
        name: name,
        price: price,
        quantity: quantity,
        image: image,
      });
      toast.success(`Save ${response.data.name} sucessfully`)
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-6 rounded mt-2">
      <h2 className="font-bold text-2xl mb-4 block text-center">
        Create a Product
      </h2>
      {!isLoading ? "Loading" : (
        <>
          
        </>
      )}
      <form onSubmit={productSaveHandler}>
        <div className="space-y-2">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={nameHandler}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400"
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label className="font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={priceHandler}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400"
              placeholder="Enter Price"
            />
          </div>
          <div>
            <label className="font-medium">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={quantityHandler}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400"
              placeholder="Enter Quantity"
            />
          </div>
          <div>
            <label className="font-medium">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={imageHandler}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder-gray-400"
              placeholder="Enter Image URL"
            />
          </div>
          <div>
            {!isLoading && (
              <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-3 font-bold hover:bg-blue-600 hover:cursor-pointer">
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
