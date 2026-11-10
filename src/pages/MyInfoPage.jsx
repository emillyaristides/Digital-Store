import AccountSidebar from "../components/AccountSidebar";

// Dados de exemplo (do Figma)
const personal = [
  { label: "Nome:", value: "------------" },
  { label: "CPF:", value: "xxx.xxx.xxx-xx" },
  { label: "E-mail:", value: "xxxxxx@gmail.com" },
  { label: "Celular:", value: "(xx) xxxxxxxxx" },
];

const delivery = [
  { label: "Endereço:", value: "--------" },
  { label: "Bairro:", value: "---------" },
  { label: "Cidade:", value: "----------" },
  { label: "Cep:", value: "XXXXX-XXX" },
];

const MyInfoPage = () => {
  return (
    <div className="op-page">
      <div className="op-layout">
        <AccountSidebar />

        <section className="op-main">
          <div className="op-head">
            <h1>Minhas Informações</h1>
            <a href="#editar" className="ip-edit">
              editar
            </a>
          </div>

          <div className="ip-section">
            <h2>Minhas Informações</h2>

            {personal.map((item) => (
              <p key={item.label} className="ip-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </p>
            ))}
          </div>

          <div className="ip-section ip-section-last">
            <h2>Informações de Entrega</h2>

            {delivery.map((item) => (
              <p key={item.label} className="ip-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyInfoPage;