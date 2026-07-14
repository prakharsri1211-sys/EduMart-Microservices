import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Students from './components/Students';
import Settings from './components/Settings';
import MyCourses from './components/MyCourses';
import Payments from './components/Payments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/courses/new" element={<Layout><CreateCourse /></Layout>} />
            <Route path="/courses" element={<Layout><Courses /></Layout>} />
            <Route path="/students" element={<Layout><Students /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/my-courses" element={<Layout><MyCourses /></Layout>} />
            <Route path="/payments" element={<Layout><Payments /></Layout>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;