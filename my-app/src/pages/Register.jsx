import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    UserPlus,
    Snail,
    Flag
} from "lucide-react";

import { registerUser } from "../services/usuarioService";

import "../styles/auth.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
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
        setMessage("");

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {

            setLoading(true);

            const response = await registerUser(formData);

            setMessage(response.message);

            setFormData({
                nombre: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1200);

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
                        CREA TU CUENTA
                    </span>

                    <h1 className="auth-title">
                        ÚNETE A LA
                        <br />
                        CARRERA
                        <br />
                        <span>HOY.</span>
                    </h1>

                    <p className="auth-description">
                        Regístrate y accede a tu panel para consultar
                        saldo, estadísticas y resultados simulados
                        de tus carreras.
                    </p>

                    <div className="auth-track">

                        <Snail size={30} />

                        <div className="auth-track-line" />

                        <Flag size={27} />

                    </div>

                </div>

            </section>


            {/* REGISTRO */}

            <section className="auth-form-wrapper">

                <div className="auth-card">

                    <div className="auth-card-header">

                        <h1>Crear cuenta</h1>

                        <p>
                            Regístrate para comenzar en SnailBet.
                        </p>

                    </div>


                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}


                    {message && (
                        <div className="auth-success">
                            {message}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>
                                Nombre completo
                            </label>

                            <div className="input-wrapper">

                                <User
                                    className="input-icon"
                                    size={19}
                                />

                                <input
                                    className="form-input"
                                    type="text"
                                    name="nombre"
                                    placeholder="Tu nombre completo"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


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
                                    placeholder="Mínimo 6 caracteres"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength="6"
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Confirmar contraseña
                            </label>

                            <div className="input-wrapper">

                                <Lock
                                    className="input-icon"
                                    size={19}
                                />

                                <input
                                    className="form-input"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Repite tu contraseña"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    minLength="6"
                                    required
                                />

                            </div>

                        </div>


                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={loading}
                        >

                            <UserPlus size={19} />

                            {loading
                                ? "Creando cuenta..."
                                : "Crear cuenta"
                            }

                        </button>

                    </form>


                    <div className="auth-footer">

                        ¿Ya tienes una cuenta?

                        <Link to="/login">
                            Iniciar sesión
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Register;