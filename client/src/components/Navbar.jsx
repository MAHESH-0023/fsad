import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Car, User } from "lucide-react";

const Navbar = () => {
    const [username, setUsername] = useState(localStorage.getItem("username") || null);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        setUsername(null);
        window.location.href = "/auth";
    };

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-screen-xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-cyan-400 hover:text-cyan-300 transition">
                        <Car className="h-6 w-6" />
                        <span>RideAway</span>
                    </Link>
                    <div className="flex gap-6 items-center text-sm font-medium">
                        <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
                        <Link to="/cars" className="hover:text-cyan-400 transition">Cars</Link>
                        <Link to="/booking" className="hover:text-cyan-400 transition">Booking</Link>
                        <Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link>

                        {!username ? (
                            <Link to="/auth" className="bg-cyan-600 px-4 py-2 rounded-lg text-white hover:bg-cyan-500 transition">
                                Login
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                                <User className="h-5 w-5 text-cyan-300" />
                                <span className="text-sm">User: <strong className="text-cyan-400">{username}</strong></span>
                                <button
                                    onClick={handleLogout}
                                    className="ml-3 bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm text-white transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
