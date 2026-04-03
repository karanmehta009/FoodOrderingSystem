import { useState } from "react";
import { registerUser } from "../services/userService";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await registerUser(form);
      
      alert(res.data.message);
    } catch (error) {
      
      alert(error.response?.data?.message);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
        type="password"
          placeholder="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
         <button type="submit">Register</button>
      </form>
      
    </div>
  );
}
export default RegisterPage;