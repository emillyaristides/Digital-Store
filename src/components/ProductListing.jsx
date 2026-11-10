import ProductCard from "./ProductCard";

const ProductListing = ({ products }) => {
  return (
    <div className="listing-grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductListing;