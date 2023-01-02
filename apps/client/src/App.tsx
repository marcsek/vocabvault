import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrpcQueryProvider from './providers/trpcQuery.provider';
import Layout from './components/Layout/Layout.component';
import AuthPage from './pages/Auth/Auth.page';
import Login from './pages/Auth/components/Login.components';
import Register from './pages/Auth/components/Register.component';
import RequireUser from './components/RequireUser/RequireUser.component';
import { UserContextProvider } from './providers/UserContext.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <TrpcQueryProvider>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/auth" element={<AuthPage />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route element={<RequireUser />}>
                <Route path="/" element={<div>Procted</div>}></Route>
              </Route>
            </Route>
          </Routes>
        </Router>
        <ReactQueryDevtools />
      </UserContextProvider>
    </TrpcQueryProvider>
  );
}

export default App;
