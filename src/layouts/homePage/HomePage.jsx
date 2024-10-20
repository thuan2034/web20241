import React from 'react';
import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode'; // Import mặc định từ jwt-decode
import { jwtDecode } from "jwt-decode";
function Homepage() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('jwt');

  // Giải mã JWT và lấy thông tin username
  let username = 'User'; // Default username
  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded);
    username = decoded.sub || 'User'; 
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Xóa JWT từ localStorage
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Homepage</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {localStorage.getItem('jwt') ? (
                <li className="nav-item">
                  <span className="nav-link">Welcome, {username}</span>
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">Signup</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <h1>Welcome to the Homepage</h1>
        <p>This is the main page after login.</p>
      </div>
    </div>
  );
}

export default Homepage;
