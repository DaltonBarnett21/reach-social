import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  if (typeof window !== "undefined" && currentUser === null)
    router.push("/login");

  if (!currentUser) return <p>Loading...</p>;

  return children;
};

export default ProtectedRoute;
