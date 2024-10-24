import './App.css';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';

import { selectIsRefreshing } from './redux/auth/selectors';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

import { refreshUser } from './redux/auth/operations';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Layout from './components/Layout/Layout';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/register'
              element={
                <RestrictedRoute
                  redirectTo='/contacts'
                  component={RegisterPage} // Передаємо функцію компонента, а не JSX елемент
                />
              }
            />
            <Route
              path='/login'
              element={
                <RestrictedRoute
                  redirectTo='/contacts'
                  component={LoginPage} // Передаємо функцію компонента
                />
              }
            />
            <Route
              path='/contacts'
              element={
                <PrivateRoute
                  redirectTo='/login'
                  component={ContactsPage} // Передаємо функцію компонента
                />
              }
            />
            <Route
              path='*'
              element={
                <RestrictedRoute
                  redirectTo='/'
                  component={NotFoundPage} // Передаємо функцію компонента
                />
              }
            />
          </Routes>
        </Layout>
      )}
      <Toaster position='top-right' reverseOrder={false} />
    </>
  );
}

export default App;
