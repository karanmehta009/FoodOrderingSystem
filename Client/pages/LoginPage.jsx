import { useState } from "react";
import { loginUser } from "../services/userService";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      //save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("login sucessfully");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 border p-2 rounded ">
      <h2 className="text-3xl text-red-500">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Emial"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="password"
          className="border p-2 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" >Login</button>
      </form>
    </div>
  );
}
export default LoginPage;