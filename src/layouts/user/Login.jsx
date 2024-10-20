import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {  // Thêm onLogin vào props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/account/login', {
        username,
        password
      });

      if (response.status === 200) {
        const { jwt } = response.data;

        // Lưu JWT vào localStorage
        localStorage.setItem('jwt', jwt);

        // Gọi onLogin để cập nhật trạng thái đăng nhập
        onLogin(jwt);

        // Điều hướng đến trang chủ
        navigate('/');
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại');
      }
    } catch (error) {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
              <p className="text-center mt-3">
                Chưa có tài khoản? <a href="/signup">Đăng ký</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
