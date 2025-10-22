// components/PageLinks.jsx
import { Link } from "react-router-dom";

export default function PageLinks({ to, children, variant = "blue", className = "" }) {
  const base =
    "flex items-center justify-center p-1 rounded border ";
  const colors = {
    blue: "bg-blue-300 hover:bg-blue-400 border-blue-400",
    red: "bg-red-300 hover:bg-red-400 border-red-400",
    green: "bg-green-300 hover:bg-green-400 border-green-400",
    purple: "bg-purple-300 hover:bg-purple-400 border-purple-400",
    pink:"bg-pink-300 hover:bg-pink-400 border-pink-400",
  };

  return (
    <Link to={to} className={`${base} ${colors[variant]} ${className}`}>
      {children}
    </Link>
  );
}