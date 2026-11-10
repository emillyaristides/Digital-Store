import { Link, useLocation } from "react-router-dom";

const AccountSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="op-sidebar">
      <a href="#perfil">Meu Perfil</a>

      <Link
        to="/meus-pedidos"
        className={pathname.startsWith("/meus-pedidos") ? "active" : ""}
      >
        Meus Pedidos
      </Link>

      <Link
        to="/minhas-informacoes"
        className={pathname.startsWith("/minhas-informacoes") ? "active" : ""}
      >
        Minhas Informações
      </Link>

      <a href="#pagamento">Métodos de Pagamento</a>
    </aside>
  );
};

export default AccountSidebar;