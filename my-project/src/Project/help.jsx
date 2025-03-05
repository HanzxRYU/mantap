import { Link } from "react-router-dom";

const Help = () => {
  // Untuk tombol kembali

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Help Page</h1>
        <p className="text-center text-gray-500 mb-6">Kelola akun Anda dengan mudah</p>
        
        <div className="space-y-4">
          <Link
            to="/userlist"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 text-center"
          >
            User List
          </Link>
          
          <Link
            to="/create"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 text-center"
          >
            Create Account
          </Link>
          
          <Link
            to="/update"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 text-center"
          >
            Update Account
          </Link>
          
          <Link
            to="/delete"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 text-center"
          >
            Delete Account
          </Link>
        </div>
        
        <Link to="/">
          <button className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 rounded-lg shadow-md transition duration-300">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};


export default Help;
