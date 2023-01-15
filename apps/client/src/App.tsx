import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrpcQueryProvider from './providers/trpcQuery.provider';
import Layout from './components/Layout/Layout.component';
import AuthPage from './pages/Auth/Auth.page';
import Login from './pages/Auth/components/Login.components';
import Register from './pages/Auth/components/Register.component';
import RequireUser from './components/RequireUser/RequireUser.component';
import { UserContextProvider } from './providers/UserContext.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LandingPage from './pages/Landing/Landing.page';
import { Suspense } from 'react';
import AuthSuccess from './pages/Auth/components/utils/AuthSucessPopupPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import DefaultErrorBoundary from './components/ErrorBoundary/DefaultErrorBoundary';
import CreateDatasource from './pages/CreateDatasource/CreateDatasource.page';
import WordSources from './pages/WordSources/WordSources.page';
import WordSourceDetail from './pages/WordSourceDetail/WordSourceDetail.page';
import Settings from './pages/Settings/Settings.page';
import General from './pages/Settings/views/General';
import Children from './pages/Settings/views/Children';
import Security from './pages/Settings/views/Security';

function App() {
  return (
    <Router>
      <TrpcQueryProvider>
        <Suspense fallback={<div>Loading</div>}>
          <ErrorBoundary FallbackComponent={DefaultErrorBoundary}>
            <UserContextProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/auth" element={<AuthPage />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                  </Route>
                </Route>
                <Route element={<Layout hasHeader />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route element={<RequireUser />}>
                    <Route path="/protected" element={<div className="font-medium text-gray-50">Procted</div>}></Route>
                    <Route path="/create-datasource" element={<CreateDatasource />} />
                    <Route path="/word-sources" element={<WordSources />} />
                    <Route path="/word-sources/:id" element={<WordSourceDetail />} />
                    <Route path="/settings" element={<Settings />}>
                      <Route path="" element={<General />} />
                      <Route path="children" element={<Children />} />
                      <Route path="security" element={<Security />} />
                    </Route>
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
