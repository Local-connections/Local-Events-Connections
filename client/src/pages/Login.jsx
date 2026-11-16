
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  const [error, setError] = useState("");

  const successMessage = location.state?.message;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await login(userData);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data ||
        err.message ||
        "Login failed. Please check your credentials.";

      setError(message);
      console.error("Login failed: ", err);
    }
  };

  return (
    <div className="form-section">
      <h3>Login to your account</h3>

      {successMessage && (
        <p className="success-message" role="status" >
          {successMessage}
        </p>
      )}

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Submit</button>
      </form>

      <p>
        Need an account?{" "}
        <Link to="/register">Register an account here.</Link>
      </p>
    </div>
  );
};

export default Login;
