import logoFooter from "../assets/logo-footer.svg";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="ft-inner">
        <div className="ft-top">
          {/* Sobre */}
          <div className="ft-about">
            <img
              src={logoFooter}
              alt="Digital Store"
              className="ft-logo"
            />

            <p>
              A Digital Store oferece produtos para você expressar seu
              estilo com conforto e qualidade.
            </p>

            <div className="ft-socials">
              <a href="https://www.facebook.com/" aria-label="Facebook">
                <img src={facebook} alt="" />
              </a>

              <a href="https://www.instagram.com/" aria-label="Instagram">
                <img src={instagram} alt="" />
              </a>

              <a href="https://twitter.com/" aria-label="Twitter">
                <img src={twitter} alt="" />
              </a>
            </div>
          </div>

          {/* Informação */}
          <div className="ft-column">
            <h3>Informação</h3>
            <a href="#sobre">Sobre Drip Store</a>
            <a href="#seguranca">Segurança</a>
            <a href="#wishlist">Wishlist</a>
            <a href="#blog">Blog</a>
            <a href="#trabalhe-conosco">Trabalhe conosco</a>
            <a href="/">Meus Pedidos</a>
          </div>

          {/* Categorias */}
          <div className="ft-column">
            <h3>Categorias</h3>
            <a href="/produtos">Camisetas</a>
            <a href="/produtos">Calças</a>
            <a href="/produtos">Bonés</a>
            <a href="/produtos">Headphones</a>
            <a href="/produtos">Tênis</a>
          </div>

          {/* Contato */}
          <div className="ft-column ft-contact">
            <h3>Contato</h3>
            <p>
              Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE,
              60150-161
            </p>
            <p>(85) 3051-3411</p>
          </div>
        </div>

        <div className="ft-bottom">
          <p>© {new Date().getFullYear()} Digital Store</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;