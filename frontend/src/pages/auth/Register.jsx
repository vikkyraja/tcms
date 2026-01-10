import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"TESTER" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <form onSubmit={submit} className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="font-bold mb-4">Register</h2>
        <input className="border p-2 w-full mb-2" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="border p-2 w-full mb-2" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})} />
        <select className="border p-2 w-full mb-4" onChange={e=>setForm({...form,role:e.target.value})}>
          <option>ADMIN</option>
          <option>TEST_LEAD</option>
          <option>TESTER</option>
          <option>READ_ONLY</option>
        </select>
        <button className="bg-green-600 text-white w-full p-2 rounded">Register</button>
      </div>
    </form>
  );
}
