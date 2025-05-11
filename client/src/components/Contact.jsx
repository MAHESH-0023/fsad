import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9093/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.messageContainer}>
          <h2 style={styles.successMessage}>✅ Message Sent!</h2>
          <p style={styles.successText}>Thanks for reaching out. We'll reply shortly.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            style={styles.button}
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>📨 Contact Us</h1>

      <div style={styles.formContainer}>
        {/* Info Section */}
        <div style={styles.infoSection}>
          <h2 style={styles.infoHeading}>📞 Stay Connected</h2>
          <ul style={styles.infoList}>
            <li><strong>🏠 Address:</strong> 123 Car Street, Vijayawada</li>
            <li><strong>📱 Phone:</strong> +91 1234567890</li>
            <li><strong>✉️ Email:</strong> info@carrental.com</li>
          </ul>
        </div>

        {/* Contact Form */}
        <div style={styles.formSection}>
          {error && <div style={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.inputField}
                required
              />
            </div>

            <div>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.inputField}
                required
              />
            </div>

            <div>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                style={styles.inputField}
                required
              />
            </div>

            <button
              type="submit"
              style={styles.submitButton}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styling (removed animations and card-specific styles)
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #2b2b2b, #424242)",
    color: "#fff",
    padding: "0 20px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#00bcd4",
    marginBottom: "40px",
    textAlign: "center",
  },
  formContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    maxWidth: "800px",
    width: "100%",
  },
  infoSection: {
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  infoHeading: {
    fontSize: "24px",
    color: "#00bcd4",
    marginBottom: "10px",
  },
  infoList: {
    listStyleType: "none",
    paddingLeft: "0",
    fontSize: "16px",
    color: "#ddd",
  },
  formSection: {
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
  },
  inputField: {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    backgroundColor: "#444",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "8px",
    fontSize: "16px",
  },
  submitButton: {
    backgroundColor: "#00bcd4",
    color: "#fff",
    padding: "14px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },
  successMessage: {
    fontSize: "28px",
    color: "#4CAF50",
    marginBottom: "20px",
  },
  successText: {
    color: "#ccc",
    fontSize: "16px",
    marginBottom: "30px",
  },
  errorMessage: {
    backgroundColor: "#e74c3c",
    padding: "12px",
    borderRadius: "6px",
    color: "#fff",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#00bcd4",
    padding: "12px 20px",
    borderRadius: "6px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  }
};

export default Contact;
