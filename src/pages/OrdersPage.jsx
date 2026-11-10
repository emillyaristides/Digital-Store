import AccountSidebar from "../components/AccountSidebar";
import { products } from "../data/products";

const orders = [
  {
    number: "82874862532",
    productId: 1,
    status: "Produtos em Trânsito",
    type: "transit",
  },
  {
    number: "82874862532",
    productId: 2,
    status: "Finalizado",
    type: "done",
  },
  {
    number: "82874862532",
    productId: 3,
    status: "Finalizado",
    type: "done",
  },
  {
    number: "82874862532",
    productId: 4,
    status: "Cancelado",
    type: "canceled",
  },
];

const OrdersPage = () => {
  return (
    <div className="op-page">
      <div className="op-layout">
        <AccountSidebar />

        {/* Lista de pedidos */}
        <section className="op-main">
          <div className="op-head">
            <h1>Meus Pedidos</h1>
            <span>STATUS</span>
          </div>

          <ul className="op-list">
            {orders.map((order, index) => {
              const product = products.find(
                (item) => item.id === order.productId
              );

              if (!product) return null;

              return (
                <li key={index} className="op-item">
                  <div className="op-item-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="op-item-info">
                    <span className="op-item-number">
                      Pedido n {order.number}
                    </span>
                    <p className="op-item-name">{product.name}</p>
                  </div>

                  <span className={`op-status ${order.type}`}>
                    {order.status}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default OrdersPage;