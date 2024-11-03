import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from './redux/slices/authSlice';
import { fetchWorkspaces } from './redux/slices/workspaceSlice';

function App({ routes }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);

  const handleLoginSuccess = (data) => {
    dispatch(loginUser(data));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch({ type: 'workspace/clearWorkspaceData' });
  };

  useEffect(() => {
    if (isAuthenticated && userData?.userId) {
      dispatch(fetchWorkspaces());
    }
  }, [isAuthenticated, userData, dispatch]);

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.public ? (
              <route.component onLogin={handleLoginSuccess} />
            ) : (
              isAuthenticated ? (
                <route.component />
              ) : (
                <Navigate to="/login" replace />
              )
            )
          }
        />
      ))}
    </Routes>
  );
}

export default App;
