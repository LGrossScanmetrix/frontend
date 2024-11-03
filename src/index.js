import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './routes/private/dashboard/Dashboard';
import Login from './routes/public/login/Login';
import Home from './routes/public/home/Home';
import store from './redux/store';
import Profile from './routes/private/profile/Profile';

const routes = [
  { path: "/profile", component: Profile, public: false },
  { path: "/dashboard", component: Dashboard, public: false },
  { path: "/login", component: Login, public: true },
  { path: "/", component: Home, public: true },
]; 

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App routes={routes} />
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
