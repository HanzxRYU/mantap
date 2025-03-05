import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UpdateAcc() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    axios
      .put(`https://api.escuelajs.co/api/v1/users/${userId}`, formData)
      .then((response) => {
        setMessage(`User updated: ${response.data.name}`);
      })
      .catch((error) => {
        setMessage(`Error updating user: ${error.message}`);
      });

    setUserId("");
    setFormData({
      name: "",
      email: "",
      avatar: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <Link to="/help" className="inline-block mb-4 text-blue-600 hover:text-blue-800">
          &larr; Back
        </Link>
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Update Account</h1>
        <form onSubmit={handleUpdateUser} className="space-y-5">
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 py-3 px-6 rounded-lg text-white shadow-md hover:bg-blue-700 transition duration-300"
          >
            Update User
          </button>
          {message && (
            <p className="text-center text-sm text-red-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}  