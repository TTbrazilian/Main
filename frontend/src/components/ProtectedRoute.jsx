import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";


<Route element={<ProtectedRoute />}>
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/account/orders" element={<Orders />} />
</Route>
