import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/account/signup', {
        username,
        email,
        password,
        // firstName: "",
        // lastName: "",
        // dateOfBirth: null,
        // address: "",
        // phoneNumber: "",
        // gender: "",
        // avatar: "",
        // activeNumber: "",
        // isActived: 0,
      });
  
      
      if (response.status === 200) {
        // Điều hướng đến trang login nếu thành công
        navigate('/login');
      } else {
        setError('Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      setError('Đăng ký thất bại. Tên đăng nhập hoặc email đã tồn tại.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Signup</h3>
              <form onSubmit={handleSignup}>
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
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" className="btn btn-primary w-100">Signup</button>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
              <p className="text-center mt-3">
                Đã có tài khoản? <a href="/login">Đăng nhập</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
