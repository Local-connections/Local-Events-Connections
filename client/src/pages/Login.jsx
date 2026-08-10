import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await login(userData);
      navigate("/");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="form-section">
      <h3>Login to your account</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>
        Need an account? <Link to="/register">Register an account here.</Link>
      </p>
    </div>
  );
};

export default Login;
