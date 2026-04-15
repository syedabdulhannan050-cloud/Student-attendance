import { useState, useEffect } from 'react';
import { getAttendance } from '../services/api';
export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    getAttendance({ date: today }).then(res => {
      const records = res.data;
      setStats({
        total: records.length,
        present: records.filter(r => r.status === 'present').length,
        absent: records.filter(r => r.status === 'absent').length
      });
    });
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500"><p className="text-gray-500">Total Marked</p><p className="text-2xl font-bold">{stats.total}</p></div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-500"><p className="text-gray-500">Present</p><p className="text-2xl font-bold">{stats.present}</p></div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-red-500"><p className="text-gray-500">Absent</p><p className="text-2xl font-bold">{stats.absent}</p></div>
      </div>
    </div>
  );
}