import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductView from "./pages/Product-view";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/Admin/AddProduct";
import Cart from "./pages/Cart";
import AllProducts from "./pages/Admin/All-Products";
import ProtectedRoute from "./Protected";
import EditProduct from "./pages/Admin/EditProduct";
import Cookies from "universal-cookie";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartCount";
import { CartDetailsProvider } from "./context/CartDetails";
import PlaceOrder from "./pages/Place-Order";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  useEffect(() => {
    if (!token) {
      localStorage.removeItem("user");
    }
  }, [token]);

  return (
    <Router>
      <CartDetailsProvider>
        <CartProvider>
          <Navbar />
          <Switch>
            <ProductProvider>
              <Route exact path="/" component={Home} />
              <Route path="/shop" component={Shop} />
              <Route path="/view/:id" component={ProductView} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {/* if url is not available load an error page with current url */}
              <ProtectedRoute
                path={"/admin/edit-product/:id"}
                component={EditProduct}
              />
              <ProtectedRoute path={"/cart"} component={Cart} />
              <ProtectedRoute path={"/profile"} component={Profile} />
              <ProtectedRoute path={"/checkout"} component={Checkout} />
              <ProtectedRoute path={"/add-product"} component={AddProduct} />
              <ProtectedRoute path="/admin-products" component={AllProducts} />
              <ProtectedRoute path="/place-order" component={PlaceOrder} />
              <ProtectedRoute path="/orders" component={Orders} />
              <ProtectedRoute path="/success-order" component={OrderSuccess} />
            </ProductProvider>
          </Switch>
        </CartProvider>
      </CartDetailsProvider>
      <Footer />
    </Router>
  );
}

export default App;
