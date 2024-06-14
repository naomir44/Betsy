import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import ProductDetails from '../components/ProductDetails';
import CategoryPage from '../components/CategoryPage/CategoryPage';
import ProductReviews from '../components/ProductReviews/ProductReviews';
import FavoritesPage from '../components/FavoritesPage/FavoritesPage';
import CartItems from '../components/CartItems/CartItems';
import CreateProduct from '../components/CreateProduct';
import UserProducts from '../components/UserProducts';
import UpdateProduct from '../components/CreateProduct/UpdateProduct';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: '/category/:categoryId',
        element: <CategoryPage/>
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />
      },
      {
        path: "reviews/products/:productId",
        element: <ProductReviews />
      },
      {
        path: 'favorites',
        element: <FavoritesPage />
      },
      {
        path: "cart",
        element: <CartItems />
      },
      {
        path: "products/new",
        element: <CreateProduct />
      },
      {
        path: "user/products",
        element: <UserProducts />
      },
      {
        path: "products/:productId/edit",
        element: <UpdateProduct />
      }
    ],
  },
]);
