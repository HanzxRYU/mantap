import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Impor Link dari react-router-dom
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]); // State untuk menyimpan data user
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(""); // State untuk error

  // Fetch data user dari API saat komponen dimuat
  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users") // Ambil data dari API
      .then((response) => {
        setUsers(response.data); // Simpan data user ke state
        setLoading(false); // Matikan loading
      })
      .catch((error) => {
        setError("Error fetching users: " + error.message); // Set error jika gagal
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div className="w-full flex justify-start mb-6">
        <Link to="/help">
          <button className="px-6 py-3 bg-white text-blue-700 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            Kembali
          </button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-white mb-6">User List</h1>

      {loading && <p className="text-lg text-white">Loading users...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0
          ? users.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-2xl rounded-3xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border border-gray-300 shadow-sm"
                />
                <h2 className="text-xl font-bold mt-2 text-blue-700">{user.name}</h2>
                <p className="text-gray-700">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700">
                  <strong>Password:</strong> {user.password || "********"}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>Role:</strong> {user.role}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>ID:</strong> {user.id}
                </p>
              </div>
            ))
          : !loading && <p className="text-yellow-500">No users found.</p>}
      </div>
    </div>
  );
}
