import "./App.css";
import React, { useEffect, useState } from "react";
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
import { UserAuthProvider } from "./context/UserAuth";
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


function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Router>
      <UserAuthProvider>
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
                    <ProductView
                      cartOpen={cartOpen}
                      setCartOpen={setCartOpen}
                    />
                  </Route>
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/verify-msg" component={Verify} />
                  {/* if url is not available load an error page with current url */}
                  <ProtectedRoute
                    path={"/admin/edit-product/:id"}
                    component={EditProduct}
                  />
                  <ProtectedRoute
                    path={"/admin/edit-category/:id"}
                    component={EditCategory}
                  />
                  <ProtectedRoute
                    path={"/add-category"}
                    component={AddCategory}
                  />
                  <ProtectedRoute
                    path={"/add-address"}
                    component={CreateAddress}
                  />
                  <ProtectedRoute
                    path={"/admin-categories"}
                    component={AllCategories}
                  />

                  <ProtectedRoute path={"/profile"} component={Profile} />
                  <ProtectedRoute path={"/checkout"} component={Checkout} />
                  <ProtectedRoute
                    path={"/add-product"}
                    component={AddProduct}
                  />
                  <ProtectedRoute
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
                  <ProtectedRoute path="/dashboard" component={Dashboard} />
                  <ProtectedRoute path="/admin-orders" component={All_orders} />
                  <ProtectedRoute path="/admin-users" component={All_users} />
                  <ProtectedRoute path="/view-user/:id" component={View_user} />
                </ProductProvider>
              </Switch>
            </CartProvider>
          </CartDetailsProvider>
        </SearchProvider>
      </UserAuthProvider>
      <Footer />
    </Router>
  );
}

export default App;
