
import "../ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ id, image, name, category, price, oldPrice, discount }) => {
  return (
    <Link to={`/produto/${id}`} className="product-card-link">
      <article className="product-card">
        <div className="product-card-image">
          {discount && (
            <span className="product-discount">
              {discount}% OFF
            </span>
          )}

          <img src={image} alt={name} />
        </div>

        <p className="product-category">{category}</p>
        <h3 className="product-name">{name}</h3>

        <div className="product-prices">
          {oldPrice && (
            <span className="product-old-price">
              R$ {oldPrice}
            </span>
          )}

          <strong>R$ {price}</strong>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
