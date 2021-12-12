import './App.css';
import { Switch , Route } from 'react-router-dom'

import { Grid } from '@mui/material'
import Home from './pages/home/Home';
import SingleProduct from './pages/singleProd/SingleProduct';
import CartPage from './pages/cartPage/Cart'
import SignUp from './pages/signup/SignUp'
import SignIn from './pages/signin/SignIn'
import Checkout from './pages/checkout/Checkout'
import Payment from './pages/checkout/Checkout_Payment'
import Order from './pages/checkout/OrdersDetails'
import OrderDetails from './pages/orders/Orders'



// dashboard pages
import DashHome from './dashboard/pages/home/Home'
import Sidebar from './dashboard/components/sidebar/Sidebar'
import NewProduct from './dashboard/pages/newProduct/NewProduct'
import Navbar from './dashboard/components/topbar/Topbar'
import AllProducts from './dashboard/pages/Movielists/MovieList'
import AllOrders from './dashboard/pages/AllOrders/AllOrders'
import MyOrderDetails from './dashboard/pages/productLists/ProductList'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <>
      <Switch>
          <Route exact path="/" >
            {
              user ? (
                  <Home/>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
          <Route path="/product/:name:id" >
            {
              user ? (
                  <SingleProduct/>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
          <Route path="/cartPage">
              {
              user ? (
                  <CartPage/>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
          <Route path="/signup">
              {
                  user ? (
                      <Home/>
                  ) : (
                      <SignUp/>
                  )
                }
          </Route>
          <Route path="/signin" >
                {
              user ? (
                  <Home/>
              ) : (
                  <SignIn/>
              )
            }
          </Route>
          <Route exact path="/checkout" >
              {
              user ? (
                  <Checkout/>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
          <Route exact path="/checkout/payment" >
              {
              user ? (
                  <Payment/>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
          <Route exact path="/checkout/orderDetails" >
              {
              user ? (
                  <Order/>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
          <Route exact path = "/myOrders" >
              {
              user ? (
                  <OrderDetails/>
              ) : (
                  <SignUp/>
              )
            }
          </Route>




          {/* Admin Routes */}

        <Route exact path="/admin/addProduct" >
          {
              user ? (
                  <Grid container style={{marginTop: '60px'}} >
                      <Navbar/>
                        <Grid item xs={3}>
                          <Sidebar/>
                        </Grid>
                        <Grid item xs={9} style={{marginTop: '30px'}}>
                          <NewProduct/>
                        </Grid>
                    </Grid>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
        <Route exact path="/admin" >
          {
              user ? (
                  <Grid container style={{marginTop: '60px'}} >
                      <Navbar/>
                          <DashHome/>
                    </Grid>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
        <Route exact path="/admin/allProducts" >
          {
               user ? (
                  <Grid container style={{marginTop: '60px'}} >
                      <Navbar/>
                        <Grid item xs={3}>
                          <Sidebar/>
                        </Grid>
                        <Grid item xs={9} style={{marginTop: '30px'}}>
                          <AllProducts/>
                        </Grid>
                    </Grid>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
          <Route exact path="/admin/allOrders" >
          {
               user ? (
                  <Grid container style={{marginTop: '60px'}} >
                      <Navbar/>
                        <Grid item xs={3}>
                          <Sidebar/>
                        </Grid>
                        <Grid item xs={9} style={{marginTop: '30px'}}>
                          <AllOrders/>
                        </Grid>
                    </Grid>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
          <Route exact path="/admin/order/:id" >
          {
               user ? (
                  <Grid container style={{marginTop: '60px'}} >
                      <Navbar/>
                        <Grid item xs={3}>
                          <Sidebar/>
                        </Grid>
                        <Grid item xs={9} style={{marginTop: '30px'}}>
                          <MyOrderDetails/>
                        </Grid>
                    </Grid>
              ) : (
                  <SignUp/>
              )
            }
          </Route>
      
      </Switch>
    </>
  );
}

export default App;
