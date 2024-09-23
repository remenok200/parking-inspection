import React from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import styles from './App.module.scss';
import { useSelector } from 'react-redux';
import withSpinner from './HOC/withSpinner';
import history from './BrowserHistory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useErrorToast from './hooks/userErrorToast';
import useAuthCheck from './hooks/useAuthCheck';
import routes from './routes';

function App() {
  useErrorToast();
  useAuthCheck();

  return (
    <HistoryRouter history={history}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        newestOnTop
        theme="colored"
      />

      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </HistoryRouter>
  );
}

const AppWithSpinner = withSpinner(App);

const AppWrapper = () => {
  const isLoading = useSelector((state) =>
    Object.values(state).some((slice) => slice.isLoading)
  );

  return <AppWithSpinner isLoading={isLoading} />;
};

export default AppWrapper;
