import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-header.svg";
import { useCart } from "../context/CartContext";

// "219,90" -> 219.9
const toNumber = (value) => Number(String(value).replace(",", "."));

// 219.9 -> "219,90"
const formatMoney = (value) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// o item do carrinho pode guardar o produto dentro de "product" ou espalhado
const getProduct = (item) => item.product || item;

const Header = () => {
  const { cartItems, clearCart } = useCart();
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + toNumber(getProduct(item).price) * item.quantity,
    0
  );

  // trava a rolagem da página enquanto o menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // fecha o carrinho ao clicar fora dele
  useEffect(() => {
    if (!cartOpen) return;

    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  const closeMenu = () => setMenuOpen(false);

  // página atual (usada no menu do celular)
  const isHome = pathname === "/";
  const isProducts =
    pathname.startsWith("/produtos") || pathname.startsWith("/produto/");
  const isOrders = pathname.startsWith("/meus-pedidos");

  return (
    <header className={`header ${searchOpen ? "search-open" : ""}`}>
      <div className="header-top">
        {/* Botão do menu: só no celular */}
        <button
          type="button"
          className="header-menu-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <Link to="/" className="header-logo">
          <img src={logo} alt="Drip Store" />
        </Link>

        <form className="search-form">
          <input
            type="search"
            placeholder="Pesquisar produto..."
            aria-label="Pesquisar produto"
          />
          <button type="submit" aria-label="Pesquisar">
            🔍
          </button>
        </form>

        {/* Lupa: só no celular */}
        <button
          type="button"
          className="header-search-toggle"
          onClick={() => setSearchOpen((open) => !open)}
          aria-label="Abrir busca"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="11"
              cy="11"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 20l-4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="header-actions">
          <a href="#cadastro" className="header-signup">
            Cadastre-se
          </a>
          <button type="button" className="header-login">
            Entrar
          </button>

          {/* Carrinho com painel */}
          <div className="cart-wrapper" ref={cartRef}>
            <button
              type="button"
              className="cart-link"
              onClick={() => setCartOpen((open) => !open)}
              aria-label={`Carrinho com ${totalItems} itens`}
              aria-expanded={cartOpen}
            >
              🛒 {totalItems > 0 && <span>{totalItems}</span>}
            </button>

            {cartOpen && (
              <div className="cart-dropdown">
                <h2 className="cart-dropdown-title">Meu Carrinho</h2>

                {cartItems.length === 0 ? (
                  <p className="cart-empty">Seu carrinho está vazio.</p>
                ) : (
                  <>
                    <ul className="cart-items">
                      {cartItems.map((item, index) => {
                        const product = getProduct(item);

                        return (
                          <li
                            key={`${product.id}-${item.size}-${index}`}
                            className="cart-item"
                          >
                            <div className="cart-item-image">
                              <img src={product.image} alt={product.name} />
                            </div>

                            <div className="cart-item-info">
                              <p className="cart-item-name">{product.name}</p>

                              {item.quantity > 1 && (
                                <span className="cart-item-qty">
                                  Qtd: {item.quantity}
                                </span>
                              )}

                              <div className="cart-item-prices">
                                <strong>R${product.price}</strong>
                                {product.oldPrice && (
                                  <s>R${product.oldPrice}</s>
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="cart-total">
                      <span>Valor Total:</span>
                      <strong>R$ {formatMoney(cartTotal)}</strong>
                    </div>
                  </>
                )}

                <div className="cart-actions">
                  <button
                    type="button"
                    className="cart-clear"
                    onClick={() => clearCart && clearCart()}
                  >
                    Esvaziar
                  </button>

                  <Link
                    to="/carrinho"
                    className="cart-buy"
                    onClick={() => setCartOpen(false)}
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <a href="#categorias">Categorias</a>
        <Link to="/meus-pedidos">Meus Pedidos</Link>
      </nav>

      {/* Menu do celular */}
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <h2 className="mobile-menu-title">Páginas</h2>

        <nav className="mobile-menu-nav">
          <Link
            to="/"
            className={isHome ? "active" : ""}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/produtos"
            className={isProducts ? "active" : ""}
            onClick={closeMenu}
          >
            Produtos
          </Link>
          <a href="#categorias" onClick={closeMenu}>
            Categorias
          </a>
          <Link
            to="/meus-pedidos"
            className={isOrders ? "active" : ""}
            onClick={closeMenu}
          >
            Meus Pedidos
          </Link>
        </nav>

        <div className="mobile-menu-footer">
          <button type="button" className="mobile-menu-login">
            Entrar
          </button>
          <a href="#cadastro" className="mobile-menu-signup">
            Cadastre-se
          </a>
        </div>
      </aside>
    </header>
  );
};

export default Header;