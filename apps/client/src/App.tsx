import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import TrpcQueryProvider from './providers/trpcQuery.provider';
import Layout from './components/Layout/Layout.component';
import AuthPage from './pages/Auth/Auth.page';
import Login from './pages/Auth/components/Login.components';
import Register from './pages/Auth/components/Register.component';
import RequireUser from './components/RequireUser/RequireUser.component';
import { UserContextProvider } from './providers/UserContext.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LandingPage from './pages/Landing/Landing.page';
import AuthSuccess from './pages/Auth/components/utils/AuthSucessPopupPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import DefaultErrorBoundary from './components/ErrorBoundary/DefaultErrorBoundary';
const CreateDatasource = lazy(() => import('./pages/CreateDatasource/CreateDatasource.page'));
const WordSourceDetail = lazy(() => import('./pages/WordSourceDetail/WordSourceDetail.page'));
import Settings from './pages/Settings/Settings.page';
import General from './pages/Settings/views/General';
import Security from './pages/Settings/views/Security';
import Role from './pages/Settings/views/Role/Role';
import Social from './pages/Settings/views/Social/Social';
import Session from './pages/Session/Session.page';
import SessionStats from './pages/SessionStats/SessionStats.page';
import TopLevelSpinner from './components/Spinners/TopLevelSpinner';
import NewSession from './pages/NewSession/NewSession.page';
const SessionHistory = lazy(() => import('./pages/SessionHistory/SessionHistory'));
const WordSources = lazy(() => import('./pages/WordSources/WordSources.page'));

function App() {
  return (
    <Router>
      <TrpcQueryProvider>
        <Suspense fallback={<TopLevelSpinner />}>
          <ErrorBoundary FallbackComponent={DefaultErrorBoundary}>
            <UserContextProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/auth" element={<AuthPage />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                  </Route>
                  <Route element={<RequireUser />}>
                    <Route path="/session" element={<Session />} />
                    <Route path="/session-stats" element={<SessionStats />} />
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
                      <Route path="social" element={<Social />} />
                      <Route path="role" element={<Role />} />
                      <Route path="security" element={<Security />} />
                    </Route>
                    <Route path="/new-session" element={<NewSession />} />
                    <Route path="/session-history" element={<SessionHistory />} />
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
