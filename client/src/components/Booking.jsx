import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { CalendarIcon, User, Mail, Phone, ArrowRightCircle, CheckCircle } from 'lucide-react';

// Mock carData - Added to fix the error.
const carData = [
    { id: '1', name: 'land Crusier', pricePerDay: 50, imageUrl: 'https://via.placeholder.com/300x200?text=Camry' },
    { id: '2', name: 'city', pricePerDay: 45, imageUrl: 'https://via.placeholder.com/300x200?text=Civic' },
    { id: '3', name: 'FMustang', pricePerDay: 100, imageUrl: 'https://via.placeholder.com/300x200?text=Mustang' },
    { id: '4', name: 'Benz', pricePerDay: 150, imageUrl: 'https://via.placeholder.com/300x200?text=BMW+X5' },
    { id: '5', name: 'BMW', pricePerDay: 120, imageUrl: 'https://via.placeholder.com/300x200?text=C-Class' },
    { id: '6', name: 'TATA', pricePerDay: 110, imageUrl: 'https://via.placeholder.com/300x200?text=Audi+A4' },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const carId = searchParams.get("car");
  const [selectedCar, setSelectedCar] = useState(carId || "");
  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [carDetails, setCarDetails] = useState(null);

    // Set initial selected car.
    useEffect(() => {
        if (carId) {
            setSelectedCar(carId);
            const car = carData.find(c => c.id === carId);
            setCarDetails(car);
        }
    }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const bookingData = {
        carId: selectedCar,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      try {
        const response = await axios.post(
          "http://localhost:9091/api/bookings",
          bookingData,
          {
            auth: {
              username: "user",
              password: "17765439-77bf-4bf1-a78d-1d00ecd04ccf",
            },
          }
        );
        console.log("Booking Successful:", response.data);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting booking:", error.response);
        setError("Booking failed. Please check your details and try again.");
      }
    } else {
      setError("Please fill all the fields correctly, and ensure return date is after pickup date.");
    }
  };

  const validateForm = () => {
    const { pickupDate, returnDate, name, email, phone } = formData;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\d{10}$/; // Basic 10-digit phone number validation

    if (
      !pickupDate ||
      !returnDate ||
      !name ||
      !email ||
      !phone ||
      new Date(pickupDate) > new Date(returnDate) ||
      !emailRegex.test(email) ||
      !phoneRegex.test(phone)
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-900 flex items-center justify-center p-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center border border-white/20">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-white mb-4">Booking Confirmed!</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Thank you for your booking. We&apos;ll contact you shortly with the details.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-full
                       hover:from-emerald-600 hover:to-green-600 transition-all duration-300
                       shadow-lg hover:shadow-emerald-500/30 text-lg font-medium"
          >
            <ArrowRightCircle className="w-5 h-5" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8">
      <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 w-full max-w-3xl border border-white/10">
        <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Car Rental Reservation
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-400 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M10 14l2-2m0 0l2-2m-2 2v6m-4-3a9 9 0 1 1 18 0 9 9 0 0 1-18 0z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-8">
            {/* Car Details Section */}
            {carDetails && (
                <div className="md:w-1/2">
                  <div className="bg-black/80 rounded-2xl shadow-lg p-4 border border-white/10">
                    <img
                        src={carDetails.imageUrl}
                        alt={carDetails.name}
                        className="w-full h-auto rounded-xl object-cover mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-blue-300 mb-2">{carDetails.name}</h2>
                    <p className="text-gray-400 mb-4">Price: <span className="text-white font-bold">${carDetails.pricePerDay} / day</span></p>
                    {/* Add more car details here if available in your data */}
                  </div>
                </div>
            )}

          {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 md:w-1/2"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 17h2a2 2 0 0 1 2 2v2m-2-2h2m-2-2v5m0-4s1 0 1-1-1-4-1-4-1 3-1 4zM9 17v-4c0-1.5-.9-2.3-1.9-2.3M13 11c-1 0-1 1-1 1v2c0 1 1 1 1 1h2a2 2 0 0 0 2-2v-2c0-1-.9-1-1-1h-2z" />
              </svg>
              Select Car
            </label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 text-white border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400
                         transition-all duration-300 placeholder:text-gray-500"
              required
              >
              <option value="" disabled>-- Select a car --</option>
              {carData.map((car) => (
                <option key={car.id} value={car.id} className="bg-gray-800 hover:bg-gray-700">
                    {car.name} - ${car.pricePerDay} / day
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-cyan-400" />
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/20 text-white border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400
                         transition-all duration-300 placeholder:text-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-cyan-400" />
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/20 text-white border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400
                         transition-all duration-300 placeholder:text-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-3 bg-black/20 text-white border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400
                         transition-all duration-300 placeholder:text-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-yellow-400" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-black/20 text-white border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400
                         transition-all duration-300 placeholder:text-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-pink-400" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 bg-black/20 text-white border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400
                         transition-all duration-300 placeholder:text-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-full text-lg font-semibold
                       hover:from-purple-600 hover:to-blue-600 transition-all duration-300
                       shadow-lg hover:shadow-purple-500/30"
          >
            Confirm Reservation
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
