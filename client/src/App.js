import "./App.css";
import React, { useContext, useEffect, useState } from "react";
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
import AllProducts from "./pages/Admin/All-Products";
import ProtectedRoute from "./Protected";
import EditProduct from "./pages/Admin/EditProduct";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartCount";
import { CartDetailsProvider } from "./context/CartDetails";
import { UserAuthContext, UserAuthProvider } from "./context/UserAuth";
import PlaceOrder from "./pages/Place-Order";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import RatingComponent from "./pages/Rating";
import Dashboard from "./pages/Admin/Dashboard";
import All_orders from "./pages/Admin/All_orders";
import All_users from "./pages/Admin/All_users";
import View_user from "./pages/Admin/View_user";
import Search_data from "./pages/Search_data";
import { SearchProvider } from "./context/Search";
import Verify from "./pages/Verify";
import CreateAddress from "./CreateAddress";
import CartModel from "./pages/CartModel";
import AddCategory from "./pages/Admin/AddCategory";
import AllCategories from "./pages/Admin/AllCategories";
import EditCategory from "./pages/Admin/EditCategory";
import AdminProtected from "./pages/Admin/AdminProtected";
import AddressPage from "./pages/AddressPage";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const { getAuthData, authData } = useContext(UserAuthContext);

  useEffect(() => {
    getAuthData();
  }, []);

  return (
    <Router>
      <SearchProvider>
        <CartDetailsProvider>
          <CartProvider>
            <Navbar />
            <CartModel open={cartOpen} setOpen={setCartOpen} />
            <Switch>
              <ProductProvider>
                <Route exact path="/">
                  <Home cartOpen={cartOpen} setCartOpen={setCartOpen} />
                </Route>

                <Route path="/search" component={Search_data} />
                <Route path="/category/:id">
                  <Shop cartOpen={cartOpen} setCartOpen={setCartOpen} />
                </Route>
                <Route path="/view/:id">
                  <ProductView cartOpen={cartOpen} setCartOpen={setCartOpen} />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/verify-msg" component={Verify} />
                {/* if url is not available load an error page with current url */}
                <AdminProtected
                  path={"/admin/edit-product/:id"}
                  component={EditProduct}
                />
                <AdminProtected
                  path={"/admin/edit-category/:id"}
                  component={EditCategory}
                />
                <AdminProtected
                  path={"/add-category"}
                  component={AddCategory}
                />
                <ProtectedRoute
                  path={"/add-address"}
                  component={CreateAddress}
                />
                <ProtectedRoute path={"/address"} component={AddressPage} />
                <AdminProtected
                  path={"/admin-categories"}
                  component={AllCategories}
                />

                <ProtectedRoute path={"/profile"} component={Profile} />
                <ProtectedRoute path={"/checkout"} component={Checkout} />
                <AdminProtected path={"/add-product"} component={AddProduct} />
                <AdminProtected
                  path="/admin-products"
                  component={AllProducts}
                />
                <ProtectedRoute path="/place-order" component={PlaceOrder} />
                <ProtectedRoute path="/orders" component={Orders} />
                <ProtectedRoute
                  path="/success-order"
                  component={OrderSuccess}
                />
                <ProtectedRoute
                  path="/rating/:id"
                  component={RatingComponent}
                />
                <AdminProtected path="/admin-orders" component={All_orders} />
                <AdminProtected path="/admin-users" component={All_users} />
                <AdminProtected path="/view-user/:id" component={View_user} />
                <AdminProtected path="/dashboard" component={Dashboard} />
              </ProductProvider>
            </Switch>
          </CartProvider>
        </CartDetailsProvider>
      </SearchProvider>
      <Footer />
    </Router>
  );
}

export default App;
