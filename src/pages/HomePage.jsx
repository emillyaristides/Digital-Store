import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import "./HomePage.css";

const HomePage = () => {
  const [slide, setSlide] = useState(0);

  return (
    <div className="home-page">
      {/* Banner principal */}
      <section className="home-banner">
        <div className="banner-content">
          <span className="banner-label">
            Melhores ofertas personalizadas
          </span>

          <h1>
            Queima de
            <br />
            estoque Nike 🔥
          </h1>

          <p>
            Consequat culpa exercitation mollit nisi excepteur do ea
            tempor eiusmod irure consectetur.
          </p>

          <a href="/produtos" className="banner-button">
            Ver Ofertas
          </a>
        </div>

        <div className="banner-image">
          <img
            src="https://client-drip-store.vercel.app/assets/hero-product-c01ba57c.png"
            alt="Tênis Nike em destaque"
          />
        </div>

        <div className="banner-dots">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              className={`banner-dot ${slide === i ? "active" : ""}`}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Título dos banners promocionais */}
      <section className="home-promotions-section">
        <h2>Coleções em destaque</h2>
      </section>

      {/* Banners promocionais */}
      <section className="home-promotions">
        <article className="promotion-card">
          <span className="promotion-discount">30% OFF</span>
          <h3>Supreme drop</h3>
          <a href="/produtos">Comprar</a>

          <div className="promotion-image">
            <img src="/camisasupreme.png" alt="Supreme" />
          </div>
        </article>

        <article className="promotion-card">
          <span className="promotion-discount">30% OFF</span>
          <h3>Coleção Adidas</h3>
          <a href="/produtos">Comprar</a>

          <div className="promotion-image">
            <img src="/tenis.png" alt="Tênis Adidas" />
          </div>
        </article>

        <article className="promotion-card">
          <span className="promotion-discount">30% OFF</span>
          <h3>Novo Beats Bass</h3>
          <a href="/produtos">Comprar</a>

          <div className="promotion-image">
            <img src="/headPhone.png" alt="Fone Beats" />
          </div>
        </article>
      </section>

      {/* Coleções em destaque */}
      <section className="home-collections">
        <h2>Coleções em destaque</h2>

        <div className="collection-list">
          <article className="collection-card">
            <img
              src="https://client-drip-store.vercel.app/assets/iconTshirt-2fd013eb.svg"
              alt="Camiseta"
            />
            <h3>Camiseta</h3>
          </article>

          <article className="collection-card">
            <img
              src="https://client-drip-store.vercel.app/assets/iconPants-d98ecbda.svg"
              alt="Calça"
            />
            <h3>Calça</h3>
          </article>

          <article className="collection-card">
            <img
              src="https://client-drip-store.vercel.app/assets/iconPants-d98ecbda.svg"
              alt="Boné"
            />
            <h3>Boné</h3>
          </article>

          <article className="collection-card">
            <img
              src="https://client-drip-store.vercel.app/assets/iconHeadphones-2ffbdb31.svg"
              alt="Headphones"
            />
            <h3>Headphones</h3>
          </article>

          <article className="collection-card">
            <img
              src="https://client-drip-store.vercel.app/assets/iconSneakers-d162a3bf.svg"
              alt="Tênis"
            />
            <h3>Tênis</h3>
          </article>
        </div>
      </section>

      {/* Lista de produtos */}
      <section className="home-products">
        <div className="products-heading">
          <h2>Produtos em alta</h2>
          <a href="/produtos">Ver todos →</a>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Oferta especial */}
      <section className="home-special-offer">
        <div className="special-offer-image">
          <img
            className="special-offer-decoration"
            src="https://client-drip-store.vercel.app/assets/elipse-7ea9d28c.svg"
            alt=""
            aria-hidden="true"
          />

          <img
            className="special-offer-shoe"
            src="/38c2f5b3f256f97445a6bbaae35cd27d99d2d021.png"
            alt="Tênis Air Jordan edição de colecionador"
          />
        </div>

        <div className="special-offer-content">
          <span>Oferta especial</span>

          <h2>Air Jordan edição de colecionador</h2>

          <p>
            Um clássico que une estilo, conforto e
            personalidade. Garanta o seu!
          </p>

          <a href="/produtos" className="special-offer-button">
            Ver Oferta
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;