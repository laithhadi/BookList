import './App.css';
import { useState } from 'react';
import { ApiClient } from './api/apiClient';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const apiClient = new ApiClient(() => token, () => logout());

  const login = (token) => {
    window.localStorage.setItem("token", token);
    setToken(token);
  }

  const logout = (token) => {
    window.localStorage.removeItem("token", token);
    setToken(undefined);
  }

  return (
    token
      ? <Dashboard client={apiClient} />
      : <Login client={apiClient} loggedIn={(token) => login(token)} />
  );
}

export default App;
