import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "./ProductViewPage.css";

// Fundos das miniaturas (mesma imagem do produto, fundo diferente)
const gallery = [
  { id: 1, bg: "#e2e3ff" },
  { id: 2, bg: "#ffeccc" },
  { id: 3, bg: "#ffc2c2" },
  { id: 4, bg: "#dfc28f" },
  { id: 5, bg: "#ebe4d6" },
];

const sizes = ["39", "40", "41", "42", "43"];

const colors = [
  { name: "Ciano", value: "#6fe8f5" },
  { name: "Vermelho", value: "#ff5c6c" },
  { name: "Cinza", value: "#555555" },
  { name: "Roxo", value: "#6c6cb8" },
];

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.";

const ProductViewPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [current, setCurrent] = useState(0);
  const [size, setSize] = useState("41");
  const [color, setColor] = useState(1);

  // ao trocar de produto, volta ao topo e à primeira imagem
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrent(0);
  }, [id]);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h1>Produto não encontrado</h1>;
  }

  const goPrev = () =>
    setCurrent((i) => (i - 1 + gallery.length) % gallery.length);
  const goNext = () => setCurrent((i) => (i + 1) % gallery.length);

  // "219,90" -> "219" e ",90"
  const [priceInt, priceCents = "00"] = product.price.split(",");

  // outros produtos para "Produtos Relacionados"
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <div className="pv-page">
      {/* Breadcrumb */}
      <nav className="pv-breadcrumb" aria-label="Você está em">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/produtos">Produtos</a>
        <span>/</span>
        <a href="/produtos">{product.category}</a>
        <span>/</span>
        <a href="/produtos">{product.brand}</a>
        <span>/</span>
        <span className="pv-breadcrumb-current">{product.name}</span>
      </nav>

      <div className="pv-main">
        {/* Galeria */}
        <div className="pv-gallery">
          <div
            className="pv-gallery-main"
            style={{ backgroundColor: gallery[current].bg }}
          >
            <button
              type="button"
              className="pv-arrow pv-arrow-left"
              onClick={goPrev}
              aria-label="Imagem anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <img src={product.image} alt={product.name} />

            <button
              type="button"
              className="pv-arrow pv-arrow-right"
              onClick={goNext}
              aria-label="Próxima imagem"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="pv-thumbs">
            {gallery.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`pv-thumb ${current === index ? "active" : ""}`}
                style={{ backgroundColor: item.bg }}
                onClick={() => setCurrent(index)}
                aria-label={`Ver imagem ${index + 1}`}
              >
                <img src={product.image} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Informações */}
        <div className="pv-info">
          <h1>{product.name}</h1>

          <p className="pv-meta">
            {product.usage} | {product.brand} | REF:3841670{product.id}
          </p>

          <div className="pv-rating">
            <span className="pv-stars" aria-hidden="true">
              ★★★★☆
            </span>
            <span className="pv-rating-badge">4.7 ★</span>
            <span className="pv-reviews">(90 avaliações)</span>
          </div>

          <div className="pv-price">
            <span className="pv-currency">R$</span>
            <strong>{priceInt}</strong>
            <span className="pv-cents">,{priceCents}</span>
            {product.oldPrice && (
              <s className="pv-old-price">{product.oldPrice}</s>
            )}
          </div>

          <h3 className="pv-label">Descrição do produto</h3>
          <p className="pv-description">{description}</p>

          <h3 className="pv-label">Tamanho</h3>
          <div className="pv-sizes">
            {sizes.map((item) => (
              <button
                key={item}
                type="button"
                className={`pv-size ${size === item ? "active" : ""}`}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <h3 className="pv-label">Cor</h3>
          <div className="pv-colors">
            {colors.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`pv-color ${color === index ? "active" : ""}`}
                style={{ backgroundColor: item.value, color: item.value }}
                onClick={() => setColor(index)}
                aria-label={item.name}
              />
            ))}
          </div>

          <button
            type="button"
            className="pv-buy-button"
            onClick={() => {
              addToCart(product, size, 1);
              alert("Produto adicionado ao carrinho!");
            }}
          >
            COMPRAR
          </button>
        </div>
      </div>

      {/* Produtos relacionados */}
      <section className="pv-related">
        <div className="pv-related-heading">
          <h2>Produtos Relacionados</h2>
          <a href="/produtos">Ver todos →</a>
        </div>

        <div className="pv-related-grid">
          {related.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductViewPage;