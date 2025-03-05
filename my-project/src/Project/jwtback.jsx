import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AxiosStore2() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUsername(decodedToken.sub || "User");
    }
  }, []);

  const updateCart = (title, price, change) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[title]?.quantity || 0;
      const newQuantity = currentQuantity + change;
      if (newQuantity <= 0) {
        const { [title]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [title]: { price, quantity: newQuantity } };
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6 text-white">
      <header className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-md text-black">
        <h1 className="text-2xl font-bold text-black">Uddin Store</h1>
        <div className="flex items-center gap-4">
          <span className="text-blue-700 font-medium">Hi, {username}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ShoppingCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            src={product.image}
            description={product.description}
            quantity={cart[product.title]?.quantity || 0}
            onUpdate={updateCart}
          />
        ))}
      </div>
    </div>
  );
}  

function ShoppingCard({
  id,
  title,
  price,
  src,
  description,
  quantity,
  onUpdate,
}) {
    return (
        <div className="border rounded-xl shadow-md p-3 w-full flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl bg-white text-gray-800">
          <Link to={`/product/${id}`} className="text-inherit no-underline">
            <div className="relative w-full h-48">
              <img
                src={src}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="py-2 text-center">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <p className="text-gray-600 font-medium">Rp. {price.toLocaleString()}</p>
              <p className="text-gray-600 text-sm">Qty: {quantity} | Total: Rp. {(quantity * price).toLocaleString()}</p>
            </div>
          </Link>
      
          <div className="flex justify-around mt-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-600 active:bg-blue-700 transition"
              onClick={() => onUpdate(title, price, 1)}
            >
              ➕ Tambah
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-red-600 active:bg-red-700 transition"
              onClick={() => onUpdate(title, price, -1)}
            >
              ➖ Kurang
            </button>
          </div>
        </div>
      );
    }      

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error("Error fetching product detail:", error));
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-gray-500 mt-4">
        Loading product details...
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="p-8 flex flex-col lg:flex-row items-center lg:items-start lg:gap-8 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
        <div className="w-full lg:w-1/3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain rounded-lg shadow-sm"
          />
        </div>
  
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl font-bold font-extrabold text-blue-700">{product.title}</h1>
          <p className="text-blue-600 text-2xl font-bold mb-4">Rp. {product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-500 mb-4">Category: {product.category}</p>
          <p className="text-gray-500 mb-6">Rating: 4.5/5 (146 reviews)</p>
  
          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-2">Select Size:</p>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:bg-blue-800 font-bold text-lg"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
  
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/product")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-bold text-lg"
            >
              Back to Home
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-bold text-lg">
              Add to Bag
            </button>
          </div>
  
          <p className="text-black mt-6 text-sm">
            Free shipping on all continental US orders.
          </p>
        </div>
      </div>
    </div>
  );
}  