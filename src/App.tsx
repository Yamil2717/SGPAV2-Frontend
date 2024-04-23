import React, { FC, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Logs from './pages/Logs';
import Header from './components/Header';
import { NotificationProvider } from './components/notification/NotificationContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="App bg-bg min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products"
              element={
                <Layout>
                  <Inventory />
                </Layout>
              }
            />
            <Route path="/sales"
              element={
                <Layout>
                  <Sales />
                </Layout>
              }
            />
            <Route path="/logs"
              element={
                <Layout>
                  <Logs />
                </Layout>
              }
            />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;