import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/ProtectedRoute';
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>  
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<Home />} />
        
        {/* </Route> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
