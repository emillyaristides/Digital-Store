import { useState } from "react";
import FilterGroup from "../components/FilterGroup";
import ProductListing from "../components/ProductListing";
import { products } from "../data/products";
import "./ProductListing.css";

const sortOptions = [
  { value: "relevancia", label: "mais relevantes" },
  { value: "menor-preco", label: "menor preço" },
  { value: "maior-preco", label: "maior preço" },
];

const ProductListingPage = () => {
  const [brands, setBrands] = useState([]);
  const [usages, setUsages] = useState([]);
  const [genders, setGenders] = useState([]);
  const [condition, setCondition] = useState("Novo");
  const [order, setOrder] = useState("relevancia");

  // liga/desliga uma opção de checkbox
  const toggle = (list, setList) => (option) => {
    setList(
      list.includes(option)
        ? list.filter((item) => item !== option)
        : [...list, option]
    );
  };

  // lista vazia = não filtra por aquele grupo
  const matches = (selected, value) =>
    selected.length === 0 || selected.includes(value);

  const filteredProducts = [...products]
    .filter(
      (product) =>
        matches(brands, product.brand) &&
        matches(usages, product.usage) &&
        matches(genders, product.gender) &&
        product.condition === condition
    )
    .sort((a, b) => {
      const priceA = Number(a.price.replace(",", "."));
      const priceB = Number(b.price.replace(",", "."));

      if (order === "menor-preco") {
        return priceA - priceB;
      }

      if (order === "maior-preco") {
        return priceB - priceA;
      }

      return a.id - b.id;
    });

  const currentSort = sortOptions.find((option) => option.value === order);

  return (
    <div className="listing-page">
      <div className="listing-top">
        <p className="listing-summary">
          <strong>Resultados para "Tênis"</strong> -{" "}
          {filteredProducts.length} produtos
        </p>

        <label className="sort-box">
          <span>
            <strong>Ordenar por</strong>: {currentSort.label}
          </span>

          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <select
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            aria-label="Ordenar por"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="listing-layout">
        <aside className="listing-filters">
          <h2 className="filters-title">Filtrar por</h2>

          <FilterGroup
            title="Marca"
            name="marca"
            type="checkbox"
            options={["Adidas", "Calenciaga", "K-Swiss", "Nike", "Puma"]}
            selected={brands}
            onChange={toggle(brands, setBrands)}
          />

          <FilterGroup
            title="Categoria"
            name="categoria"
            type="checkbox"
            options={["Esporte e lazer", "Casual", "Utilitário", "Corrida"]}
            selected={usages}
            onChange={toggle(usages, setUsages)}
          />

          <FilterGroup
            title="Gênero"
            name="genero"
            type="checkbox"
            options={["Masculino", "Feminino", "Unisex"]}
            selected={genders}
            onChange={toggle(genders, setGenders)}
          />

          <FilterGroup
            title="Estado"
            name="estado"
            type="radio"
            options={["Novo", "Usado"]}
            selected={condition}
            onChange={setCondition}
          />
        </aside>

        <section className="listing-results">
          <ProductListing products={filteredProducts} />

          {filteredProducts.length === 0 && (
            <p className="listing-empty">
              Nenhum produto encontrado com esses filtros.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductListingPage;