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
import Store from './pages/customer/store';
import Product from './pages/products';
// import Vendor from './pages/vendors';
import VendorStore from './pages/vendors/store';
import Cart from './pages/cart';
import Checkout from './pages/customers/checkout';
import VendorDesigns from './pages/vendors/designs';
import VendorCreateDesigns from './pages/vendors/designs/create';
import VendorEditDesigns from './pages/vendors/designs/edit';
import ProductSelection from './pages/vendors/products/productSelection';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/otp-verification', element: <OtpVerification /> },
    { path: '/otp-verification-for-reset', element: <OtpForResetPassword /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '/editor', element: <Editor /> },
    // { path: '/dashboard', element: <VendorDashboard /> },
    { path: '/store/:storeUrl/products/:productId', element: <Product /> },
    { path: '/vendor', element: <VendorDashboard /> },
    { path: '/vendor/store', element: <VendorStore /> },
    { path: '/vendor/designs', element: <VendorDesigns /> },
    { path: '/vendor/create-design', element: <VendorCreateDesigns /> },
    { path: '/vendor/edit-design/:designId', element: <VendorEditDesigns /> },
    { path: '/vendor/design/product-selection', element: <ProductSelection /> },
    { path: '/cart/:storeUrl', element: <Cart /> },
    { path: '/store/:storeUrl', element: <Store /> },
    { path: '/checkout/:storeUrl', element: <Checkout /> },
  ]);
}
