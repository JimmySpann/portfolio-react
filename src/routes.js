import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import MyDashboardApp from './pages/MyDashboard';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Schedule from './pages/Schedule';

// ----------------------------------------------------------------------

export default function Router({ currentUser, setCurrentUser, logout }) {
  return useRoutes([
    {
      path: '/dashboard',
      element: currentUser ? <DashboardLayout logout={logout} /> : <Navigate to="/login" />,
      children: [
        { path: '', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <MyDashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'schedule', element: <Schedule /> },
        { path: 'old', element: <DashboardApp /> }
      ]
    },
    {
      path: '',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login setCurrentUser={setCurrentUser} /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
