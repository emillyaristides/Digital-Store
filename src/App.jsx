
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductListing from "./pages/ProductListingPage";
import ProductView from "./pages/ProductViewPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import MyInfoPage from "./pages/MyInfoPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="produtos"
            element={<ProductListing />}
          />

          <Route
            path="produto/:id"
            element={<ProductView />}
          />

          <Route
            path="carrinho"
            element={<CartPage />}
          />
          <Route
            path="meus-pedidos"
            element={<OrdersPage />}
          />
          <Route
            path="minhas-informacoes"
             element={<MyInfoPage />}
         />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
