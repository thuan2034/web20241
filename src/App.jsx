import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './layouts/homePage/HomePage';
import Signup from './layouts/user/SignUp';
import Login from './layouts/user/Login';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt')); // Kiểm tra xem đã đăng nhập hay chưa

  // Hàm xử lý khi đăng nhập thành công (lưu JWT và cập nhật trạng thái đăng nhập)
  const handleLogin = (jwt) => {
    localStorage.setItem('jwt', jwt);
    setIsAuthenticated(true);
  };

  // Hàm xử lý khi đăng xuất (xoá JWT và cập nhật trạng thái đăng nhập)
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          {/* Trang chủ - Chỉ truy cập được nếu đã đăng nhập */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Homepage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Trang đăng nhập */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />

          {/* Trang đăng ký */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
