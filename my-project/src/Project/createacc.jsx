import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Create() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    avatar: "https://i.imgur.com/LDOO4Qs.jpg",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    axios
      .post("https://api.escuelajs.co/api/v1/users", newUser)
      .then((response) => setMessage(`User created: ${response.data.name}`))
      .catch((error) => setMessage(`Error: ${error.message}`));

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
      avatar: "https://i.imgur.com/LDOO4Qs.jpg",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Create User</h1>
        <p className="text-center text-gray-500 mb-6">Buat akun baru dengan mudah</p>
        
        <form onSubmit={handleCreateUser} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 mt-1 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan Nama"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 mt-1 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan Email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 mt-1 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan Password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 py-3 px-6 rounded-lg text-white shadow-md hover:bg-blue-700 transition duration-300"
          >
            Create User
          </button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Sudah memiliki akun? {" "}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Login Sekarang
              </Link>
            </p>
          </div>
        </form>
        
        {message && (
          <div className="mt-4 text-center text-green-500 font-medium">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};  