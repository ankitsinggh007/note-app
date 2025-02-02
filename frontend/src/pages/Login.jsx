// pages/Login.jsx
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      {/* Add Navbar here if needed */}
      <main className="flex flex-grow justify-center items-center">
        <LoginForm />
      </main>
      {/* Add Footer here if needed */}
    </div>
  );
};

export default Login;
