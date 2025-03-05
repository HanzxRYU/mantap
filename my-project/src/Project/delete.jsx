import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DeleteAcc() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Untuk tombol kembali

  // Fungsi untuk menghapus data pengguna
  const handleDeleteUser = (e) => {
    e.preventDefault();

    // Mengirim permintaan DELETE ke API
    axios
      .delete(`https://api.escuelajs.co/api/v1/users/${id}`)
      .then(() => setMessage(`  User deleted successfully`))
      .catch((error) => setMessage(`  Error: ${error.message}`));

    // Reset form
    setId("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <Link to="/help" className="inline-block mb-4 text-blue-700 hover:text-blue-500">
          &larr; Back
        </Link>
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
          Hapus User
        </h1>
        <p className="text-center text-gray-500 mb-6">Masukkan User ID untuk menghapus</p>
  
        {/* Form Hapus User */}
        <form onSubmit={handleDeleteUser} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Masukkan User ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-red-600 py-3 px-6 rounded-lg text-white shadow-md hover:bg-red-700 transition duration-300"
          >
            Hapus User
          </button>
        </form>
  
        {/* Menampilkan Pesan Sukses/Error */}
        {message && (
          <div className="mt-4 text-center font-medium text-gray-700">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}  