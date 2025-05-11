import { Link } from "react-router-dom";
import { carData } from "../data/carData";

const Home = () => {
  const featuredCars = carData.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-8 py-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-3 text-cyan-400">Drive Your Dream</h1>
        <p className="text-lg text-gray-300 mb-6">
          Premium cars for rent at unbeatable prices.
        </p>
        <Link
          to="/cars"
          className="inline-block bg-cyan-500 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:bg-cyan-600 transition"
        >
          Explore Fleet
        </Link>
      </div>

      {/* Updated Grid Layout: Tighter gap and more balanced columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 items-start">
        {/* Car Cards Section - Takes up more space on larger screens */}
        <div className="md:col-span-1 lg:col-span-3 grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:scale-105 transition-transform"
            >
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-cyan-300 mb-1">{car.name}</h3>
                <p className="text-gray-300 mb-4">{car.shortDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">${car.pricePerDay}/day</span>
                  <Link
                    to={`/booking?car=${car.id}`}
                    className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About Us Description Section (formerly "Why Choose Us?") */}
        <div className="md:col-span-1 lg:col-span-2 p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 self-start md:sticky md:top-24">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">About RideAway</h2> {/* Changed Heading */}
          <p className="text-gray-300 text-lg mb-4">
            Welcome to **RideAway**, your premier destination for hassle-free car rentals. Established with a passion for mobility and customer satisfaction, we are dedicated to providing a seamless and enjoyable car rental experience.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>**Our Mission:** To offer reliable, comfortable, and stylish vehicles for every journey.</li>
            <li>**Our Vision:** To be the most trusted and preferred car rental service globally.</li>
            <li>**Our Fleet:** Handpicked selection of vehicles, regularly maintained to the highest standards.</li>
            <li>**Customer Focus:** Your convenience and safety are our top priorities, supported by 24/7 service.</li>
            <li>**Eco-Friendly Options:** Committed to sustainability with a growing selection of green vehicles.</li>
          </ul>
          <Link
            to="/about"
            className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-full text-md font-medium shadow-md hover:bg-cyan-600 transition"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;