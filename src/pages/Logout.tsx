import AppLayout from "../components/AppLayout";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";

export default function Logout() {
  const history = useHistory();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    history.replace("/");
  }, [history, logout]);

  return (
    <>
      <AppLayout activeNav="logout">
        <div className="container page">
          <p>Logging out...</p>
        </div>
      </AppLayout>
    </>
  );
}
