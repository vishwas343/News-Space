import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../../../utils/Cookies";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext"; // Adjust the import based on your structure

const AdminProtectedComponent = ({ children }) => {
  const { userData } = useContext(UserContext); // Access user data from context
  const isLoggedIn = getCookie('jwt');
  const isAdmin = userData.role === "admin"; // Check if the user's role is admin

  // Redirect to login if not logged in or not an admin
  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the children if the user is an admin
};

AdminProtectedComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtectedComponent;
