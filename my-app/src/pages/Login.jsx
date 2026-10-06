import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    Mail,
    Lock,
    LogIn,
    Snail,
    Flag
} from "lucide-react";

import { loginUser } from "../services/usuarioService";

import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        try {

            setLoading(true);

            const response = await loginUser(formData);

            localStorage.setItem(
                "token",
                response.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            navigate("/dashboard");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="auth-page">

            {/* ZONA VISUAL */}

            <section className="auth-hero">

                <div className="auth-brand">

                    <div className="auth-brand-icon">
                        <Snail size={26} />
                    </div>

                    <div>
                        <h2>SNAILBET</h2>
                        <span>RACING CLUB</span>
                    </div>

                </div>


                <div className="auth-hero-content">

                    <span className="auth-overline">
                        SNAIL RACING EXPERIENCE
                    </span>

                    <h1 className="auth-title">
                        LA CARRERA
                        <br />
                        COMIENZA
                        <br />
                        <span>AQUÍ.</span>
                    </h1>

                    <p className="auth-description">
                        Vive una experiencia de carreras diferente.
                        Consulta tus resultados, estadísticas y saldo
                        desde un solo lugar.
                    </p>

                    <div className="auth-track">

                        <Snail size={30} />

                        <div className="auth-track-line" />

                        <Flag size={27} />

                    </div>

                </div>

            </section>


            {/* LOGIN */}

            <section className="auth-form-wrapper">

                <div className="auth-card">

                    <div className="auth-card-header">
                        <h1>Iniciar sesión</h1>

                        <p>
                            Bienvenido de nuevo a SnailBet.
                        </p>
                    </div>


                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>
                                Correo electrónico
                            </label>

                            <div className="input-wrapper">

                                <Mail
                                    className="input-icon"
                                    size={19}
                                />

                                <input
                                    className="form-input"
                                    type="email"
                                    name="email"
                                    placeholder="correo@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Contraseña
                            </label>

                            <div className="input-wrapper">

                                <Lock
                                    className="input-icon"
                                    size={19}
                                />

                                <input
                                    className="form-input"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={loading}
                        >

                            <LogIn size={19} />

                            {loading
                                ? "Ingresando..."
                                : "Entrar a SnailBet"
                            }

                        </button>

                    </form>


                    <div className="auth-footer">

                        ¿Aún no tienes cuenta?

                        <Link to="/register">
                            Crear cuenta
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Login;