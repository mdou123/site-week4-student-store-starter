import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import { formatPrice } from "../../utils/format";
import "./ProductDetail.css";

function ProductDetail({ addToCart, removeFromCart, getQuantityOfItemInCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  if (error) {
    return <NotFound />;
  }

  //UseEffect to populate the actual info of products
  useEffect(() => {
    const url = `http://localhost:3000/products/${productId}`;
    console.log(url);
    const fetchList = async () => {
      try {
        const { data } = await axios.get(url);
        console.log(data);
        setProduct(data);
        setProduct({ ...data, id: data.productId });
      } catch (error) {
        console.error("Error fetching list: ", error);
      }
    };
    fetchList();
  }, []);

  if (isFetching || !product) {
    return <h1>Loading...</h1>;
  }

  const quantity = getQuantityOfItemInCart(product);

  const handleAddToCart = () => {
    if (product.productId) {
      addToCart(product);
    }
  };

  const handleRemoveFromCart = () => {
    if (product.productId) {
      removeFromCart(product);
    }
  };

  return (
    <div className="ProductDetail">
      <div className="product-card">
        <div className="media">
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
          />
        </div>
        <div className="product-info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <div className="actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
            {quantity > 0 && (
              <button onClick={handleRemoveFromCart}>Remove from Cart</button>
            )}
            {quantity > 0 && (
              <span className="quantity">Quantity: {quantity}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
