import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('token'); navigate('/login'); };
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="font-bold">Attendance App</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/attendance">Mark Attendance</Link>
        <Link to="/students">Students</Link>
        <Link to="/reports">Reports</Link>
      </div>
      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </nav>
  );
}