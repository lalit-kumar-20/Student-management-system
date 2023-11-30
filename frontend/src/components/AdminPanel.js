import React, { useState } from 'react';
import api from '../Services/API_Services';

const AdminPanel = () => {
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      const response = await api.post('/admin/login', adminCredentials);
      // Handle successful login
    } catch (error) {
      // Handle login error
    }
  };

  // Implement UI for adding students and assigning tasks

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={adminCredentials.email}
          onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={adminCredentials.password}
          onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      {/* Add student and task input fields and buttons */}
    </div>
  );
};

export default AdminPanel;
