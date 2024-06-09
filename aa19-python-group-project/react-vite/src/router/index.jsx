import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import ProductDetails from '../components/ProductDetails';
import CategoryPage from '../components/CategoryPage/CategoryPage';
import ProductReviews from '../components/ProductReviews/ProductReviews';

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
        path: "product/:productId",
        element: <ProductDetails />
      },
      {
        path: 'reviews/products/:productId',
        element: <ProductReviews />
      }
    ],
  },
]);
