import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginMas = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", {
        email,
        password,
      })
      .then((response) => {
        // Simpan token ke localStorage jika login berhasil
        localStorage.setItem("authToken", response.data.access_token);

        // Redirect ke halaman produk
        navigate("/product");
      })
      .catch((error) => {
        setError("Login gagal! Silakan periksa username dan password Anda.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Login</h1>
        <p className="text-center text-gray-500 mb-6">Akses akun Anda dengan mudah</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-1 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-1 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 py-3 px-6 rounded-lg text-white shadow-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Belum memiliki akun? {" "}
              <Link to="/help" className="text-blue-600 font-medium hover:underline">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-500 font-medium">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginMas;