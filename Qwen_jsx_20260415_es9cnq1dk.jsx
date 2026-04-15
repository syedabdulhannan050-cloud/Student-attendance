import { useState, useEffect } from 'react';
import { getStudents, markAttendance } from '../services/api';
export default function MarkAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cls, setCls] = useState('10');
  const [sec, setSec] = useState('A');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  useEffect(() => {
    getStudents({ class: cls, section: sec }).then(res => {
      setStudents(res.data);
      const init = {}; res.data.forEach(s => init[s._id] = 'present');
      setAttendance(init);
    });
  }, [cls, sec]);
  const handleSubmit = async () => {
    const records = Object.entries(attendance).map(([id, status]) => ({ studentId: id, status }));
    try {
      await markAttendance({ date, records });
      alert('Attendance saved successfully!');
    } catch { alert('Error saving attendance'); }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      <div className="flex gap-4 mb-4">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 rounded" />
        <select value={cls} onChange={e => setCls(e.target.value)} className="border p-2 rounded">
          {[9,10,11,12].map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={sec} onChange={e => setSec(e.target.value)} className="border p-2 rounded">
          {['A','B','C'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100"><tr><th className="p-2 border">Roll</th><th className="p-2 border">Name</th><th className="p-2 border">Status</th></tr></thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td className="p-2 border text-center">{s.rollNumber}</td>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border text-center">
                <label className="mr-4"><input type="radio" name={s._id} checked={attendance[s._id]==='present'} onChange={() => setAttendance({...attendance, [s._id]:'present'})} /> P</label>
                <label><input type="radio" name={s._id} checked={attendance[s._id]==='absent'} onChange={() => setAttendance({...attendance, [s._id]:'absent'})} /> A</label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Attendance</button>
    </div>
  );
}