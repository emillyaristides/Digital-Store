import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// "219,90" -> 219.9
const toNumber = (value) => Number(String(value).replace(",", "."));

// 219.9 -> "219,90"
const formatMoney = (value) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + toNumber(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Compra finalizada! Obrigado por comprar na Digital Store.");
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="cp-page">
        <h1 className="cp-title">Meu carrinho</h1>

        <div className="cp-empty">
          <p>Seu carrinho está vazio.</p>
          <Link to="/produtos" className="cp-button">
            Ver produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-page">
      <h1 className="cp-title">Meu carrinho</h1>

      <div className="cp-layout">
        {/* Lista de itens */}
        <ul className="cp-items">
          {cartItems.map((item, index) => {
            const unit = toNumber(item.price);

            return (
              <li key={`${item.id}-${item.size}-${index}`} className="cp-item">
                <div className="cp-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cp-item-info">
                  <h2>{item.name}</h2>

                  <p>
                    <span>Tamanho:</span> {item.size}
                  </p>
                  <p>
                    <span>Quantidade:</span> {item.quantity}
                  </p>
                  <p>
                    <span>Preço unitário:</span> R$ {formatMoney(unit)}
                  </p>

                  <p className="cp-subtotal">
                    Subtotal: R$ {formatMoney(unit * item.quantity)}
                  </p>
                </div>

                <button
                  type="button"
                  className="cp-remove"
                  onClick={() => removeFromCart(index)}
                >
                  Remover
                </button>
              </li>
            );
          })}
        </ul>

        {/* Resumo */}
        <aside className="cp-summary">
          <h2>Resumo da compra</h2>

          <div className="cp-total">
            <span>Total da compra:</span>
            <strong>R$ {formatMoney(total)}</strong>
          </div>

          <button
            type="button"
            className="cp-button"
            onClick={handleCheckout}
          >
            Finalizar compra
          </button>

          <button type="button" className="cp-clear" onClick={clearCart}>
            Esvaziar carrinho
          </button>

          <Link to="/produtos" className="cp-continue">
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;