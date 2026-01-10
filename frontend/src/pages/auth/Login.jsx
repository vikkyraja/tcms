import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    login(res.data);
    navigate("/");
  };

  return (
    <form onSubmit={submit} className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="font-bold mb-4">Login</h2>
        <input className="border p-2 w-full mb-2" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white w-full p-2 rounded">Login</button>
      </div>
    </form>
  );
}
