import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import ForgotPassword from './pages/authentication/ForgotPassword';

// Pages
import Login from './pages/authentication/Login';
import OtpForResetPassword from './pages/authentication/OtpForResetPassword';
import OtpVerification from './pages/authentication/OtpVerification';
import Register from './pages/authentication/Register';
import ResetPassword from './pages/authentication/ResetPassword';
import Editor from './pages/editor/Editor';
import Home from './pages/home';
import VendorDashboard from './pages/vendors';
<<<<<<< HEAD
import Store from './pages/store';
import Product from './pages/products';
=======
import Store from './pages/vendors/store';
>>>>>>> 4d5eb8437679b9e9e5b8d9124a531c87768f7fca
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
<<<<<<< HEAD
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/otp-verification', element: <OtpVerification /> },
    { path: '/otp-verification-for-reset', element: <OtpForResetPassword /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '/editor', element: <Editor /> },
    { path: '/dashboard', element: <VendorDashboard /> },
    { path: '/store', element: <Store /> },
    { path: '/products/:productId', element: <Product /> },
=======
    { path: "/", element: <Home />},
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/otp-verification", element: <OtpVerification /> },
    { path: "/otp-verification-for-reset", element: <OtpForResetPassword /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword />},
    { path: "/editor", element: <Editor /> },
    { path: "/dashboard", element: <VendorDashboard /> },
    { path: "/store", element: <Store /> }
>>>>>>> 4d5eb8437679b9e9e5b8d9124a531c87768f7fca
  ]);
}
