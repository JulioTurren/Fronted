import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/usuarioService";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] =
        useState(false);

    useEffect(() => {

        const verifySession = async () => {

            const token =
                localStorage.getItem("token");

            if (!token) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            try {

                await getProfile();

                setAuthenticated(true);

            } catch (error) {

                console.error(
                    "Sesión inválida:",
                    error.message
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setAuthenticated(false);

            } finally {

                setLoading(false);
            }
        };

        verifySession();

    }, []);

    if (loading) {

        return (
            <div className="loading-screen">
                Verificando sesión...
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;