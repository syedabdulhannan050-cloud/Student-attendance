import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch { alert('Invalid credentials'); }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="w-full border p-2 mb-3 rounded" placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} />
        <input className="w-full border p-2 mb-4 rounded" placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}