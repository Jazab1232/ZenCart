import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Home from './Components/Home.jsx';
import Details from './Components/Details.jsx';
import Test from './Components/Test.jsx';
import CategoryPage from './Components/CategoryPage.jsx';
import Login from './Components/Login.jsx';
import SignUp from './Components/signUp.jsx';
import { AppProvider } from './Components/context/Context.jsx';
import Cart from './Components/Cart.jsx';
import Checkout from './Components/Checkout.jsx';
import OrderDetails from './Components/OrderDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "details",
        element: <Details />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orderDetails",
        element: <OrderDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AppProvider>
);
