import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, imgName, image, price, description, category }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-img" src={`${url}/images/` + image} alt="" />
        {!cartItems[id] ? (
          <div className="add">
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt=""
            />
          </div>
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{imgName}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <div className="food-item-price-category">
          <p className="price">${price}</p>
          <p className="category">{category}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
