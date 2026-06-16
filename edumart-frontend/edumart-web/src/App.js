import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            {/* Additional protected routes can be added here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;