import { useState, useEffect } from "react";

const Cars = () => {
  // Your existing states and logic remain unchanged
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    type: "",
    imageUrl: "",
    shortDescription: "",
    pricePerDay: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:9092/api/cars");
        if (!response.ok) throw new Error("Failed to fetch cars");
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:9092/api/cars/${formData.id}`
      : "http://localhost:9092/api/cars";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save car");

      const updatedCar = await response.json();

      if (isEditing) {
        setCars((prevCars) =>
          prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
        );
      } else {
        setCars((prevCars) => [...prevCars, updatedCar]);
      }

      setFormData({
        id: null,
        name: "",
        type: "",
        imageUrl: "",
        shortDescription: "",
        pricePerDay: "",
      });
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const response = await fetch(`http://localhost:9092/api/cars/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete car");

      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (car) => {
    setFormData(car);
    setIsEditing(true);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Loading cars...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#b00020" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "2rem auto",
        padding: "0 1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#1e293b",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
        Manage Cars
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: "1 1 300px",
            padding: "0.75rem 1rem",
            borderRadius: 8,
            border: "2px solid #cbd5e1",
            fontSize: "1rem",
            outline: "none",
            minWidth: 250,
          }}
          onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
          onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
        />

        <form
          key={formData.id || "new"}
          onSubmit={handleFormSubmit}
          style={{
            flex: "2 1 600px",
            backgroundColor: "#f9fafb",
            padding: "1.5rem",
            borderRadius: 12,
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#2563eb",
              marginBottom: "0.75rem",
            }}
          >
            {isEditing ? "Edit Car" : "Add New Car"}
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Car Name"
              required
              style={{
                flex: "1 1 45%",
                padding: "0.5rem 1rem",
                borderRadius: 6,
                border: "1.5px solid #94a3b8",
                fontSize: "1rem",
              }}
            />
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              placeholder="Car Type"
              required
              style={{
                flex: "1 1 45%",
                padding: "0.5rem 1rem",
                borderRadius: 6,
                border: "1.5px solid #94a3b8",
                fontSize: "1rem",
              }}
            />
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleFormChange}
              placeholder="Image URL"
              style={{
                flex: "1 1 45%",
                padding: "0.5rem 1rem",
                borderRadius: 6,
                border: "1.5px solid #94a3b8",
                fontSize: "1rem",
              }}
            />
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleFormChange}
              placeholder="Short Description"
              style={{
                flex: "1 1 45%",
                padding: "0.5rem 1rem",
                borderRadius: 6,
                border: "1.5px solid #94a3b8",
                fontSize: "1rem",
              }}
            />
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleFormChange}
              placeholder="Price Per Day"
              required
              style={{
                flex: "1 1 45%",
                padding: "0.5rem 1rem",
                borderRadius: 6,
                border: "1.5px solid #94a3b8",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: submitting ? "#93c5fd" : "#3b82f6",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: 8,
              border: "none",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: submitting ? "not-allowed" : "pointer",
              alignSelf: "flex-start",
              marginTop: "1rem",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = "#2563eb")}
            onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = "#3b82f6")}
          >
            {isEditing ? "Update Car" : "Add Car"}
          </button>
        </form>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filteredCars.map((car) => (
          <div
            key={car.id}
            style={{
              display: "flex",
              backgroundColor: "white",
              borderRadius: 12,
              boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={car.imageUrl}
              alt={car.name}
              style={{
                width: 220,
                height: 160,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                padding: "1rem 1.5rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    color: "#1e293b",
                    marginBottom: "0.25rem",
                  }}
                >
                  {car.name}
                </h3>
                <p style={{ color: "#475569", fontSize: "1rem", marginBottom: "0.5rem" }}>
                  {car.shortDescription}
                </p>
                <div style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "0.5rem" }}>
                  {car.type}
                </div>
                <div style={{ fontWeight: "700", fontSize: "1.1rem", color: "#2563eb" }}>
                  ${car.pricePerDay}/day
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  onClick={() => handleEdit(car)}
                  style={{
                    backgroundColor: "#facc15",
                    color: "#1e293b",
                    border: "none",
                    borderRadius: 8,
                    padding: "0.5rem 1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    flex: "1",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#eab308")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#facc15")}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "0.5rem 1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    flex: "1",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
