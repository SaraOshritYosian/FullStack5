import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // Check if user logged in 
  if (localStorage.getItem("currentUser") === "") {
    return <Navigate to="/login" />;
  }
  return children;
}
export default ProtectedRoute;