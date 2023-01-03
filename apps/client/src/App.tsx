import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrpcQueryProvider from './providers/trpcQuery.provider';
import Layout from './components/Layout/Layout.component';
import AuthPage from './pages/Auth/Auth.page';
import Login from './pages/Auth/components/Login.components';
import Register from './pages/Auth/components/Register.component';
import RequireUser from './components/RequireUser/RequireUser.component';
import { UserContextProvider } from './providers/UserContext.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LandingPage from './pages/LandingPage/LandingPage.page';
import { Suspense } from 'react';
import AuthSuccess from './pages/Auth/components/AuthSucess';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import DefaultErrorBoundary from './components/ErrorBoundary/DefaultErrorBoundary';

function App() {
  return (
    <Router>
      <TrpcQueryProvider>
        <Suspense fallback={<div>Loading</div>}>
          <ErrorBoundary FallbackComponent={DefaultErrorBoundary}>
            <UserContextProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<AuthPage />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                  </Route>
                  <Route element={<RequireUser />}>
                    <Route path="/protected" element={<div className="font-medium text-gray-50">Procted</div>}></Route>
                  </Route>
                </Route>
                <Route path="/auth/success" element={<AuthSuccess />} />
              </Routes>
            </UserContextProvider>
          </ErrorBoundary>
        </Suspense>
        <ReactQueryDevtools />
      </TrpcQueryProvider>
    </Router>
  );
}

export default App;
