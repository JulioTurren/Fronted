import { useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    WalletCards,
    CircleDollarSign,
    Trophy,
    CircleX,
    Plus,
    LogOut,
    Snail
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import "../styles/dashboard.css";
import { useState } from "react";
import SnailPayModal from "../components/SnailPayModal";

function Dashboard() {

    const navigate = useNavigate();

    const [isSnailPayOpen, setIsSnailPayOpen ]= useState(false);
    const [user, setUser] = useState(() => {

        const storedUser =
            localStorage.getItem("user");
        
        return storedUser
            ? JSON.parse(storedUser)
            : null;
    });

    const handleBalanceUpdated = (updatedUser) => {

        setUser(updatedUser);

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );
    };

    const apuestasData = [
        {
            name: "Ganadas",
            value: 8
        },
        {
            name: "Perdidas",
            value: 4
        }
    ];

    const carrerasData = [
        {
            nombre: "Turbo",
            victorias: 2
        },
        {
            nombre: "Rayo",
            victorias: 1
        },
        {
            nombre: "Flash",
            victorias: 0
        },
        {
            nombre: "Baba",
            victorias: 1
        },
        {
            nombre: "Shelly",
            victorias: 2
        },
        {
            nombre: "Speedy",
            victorias: 0
        }
    ];

    const COLORS = [
        "#e10600",
        "#555555"
    ];

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (

        <div className="dashboard-layout">

            <aside className="sidebar">

                <div className="dashboard-logo">

                    <div className="dashboard-logo-icon">
                        <Snail size={25} />
                    </div>

                    <div>
                        <h2>SNAILBET</h2>
                        <span>RACING CLUB</span>
                    </div>

                </div>


                <p className="menu-label">
                    MENÚ PRINCIPAL
                </p>

                <nav className="sidebar-nav">

                    <button className="sidebar-button active">
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button className="sidebar-button">
                        <WalletCards size={18} />
                        SnailPay
                    </button>

                </nav>


                <div className="sidebar-user">

                    <div className="user-avatar">
                        {user?.nombre
                            ?.charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>
                        <strong>
                            {user?.nombre}
                        </strong>

                        <small>Jugador</small>
                    </div>

                </div>

            </aside>

            <main className="dashboard-main">

                <header className="dashboard-header">

                    <div>
                        <h1>
                            Hola, {user?.nombre}
                        </h1>

                        <p>
                            Consulta el resumen de tu actividad.
                        </p>
                    </div>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        <LogOut size={17} />

                        Cerrar sesión
                    </button>

                </header>

                <section className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon gold">
                            <CircleDollarSign size={23} />
                        </div>

                        <div>
                            <span>Saldo disponible</span>

                            <h2 className="balance-value">
                                $
                                {user?.saldo?.toFixed(2)
                                    || "0.00"}
                            </h2>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon green">
                            <Trophy size={22} />
                        </div>

                        <div>
                            <span>Apuestas ganadas</span>
                            <h2>8</h2>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon red">
                            <CircleX size={22} />
                        </div>

                        <div>
                            <span>Apuestas perdidas</span>
                            <h2>4</h2>
                        </div>

                    </div>


                    <div className="stat-card snailpay-card">

                        <div>
                            <span>SnailPay</span>
                            <h2>Cargar saldo</h2>
                        </div>

                        <button className="snailpay-button" onClick={() => setIsSnailPayOpen(true)}>
                            <Plus size={20} />
                        </button>
                              
                    </div>

                </section>

                <section className="charts-grid">

                    <article className="chart-card">

                        <div className="chart-header">

                            <div>
                                <h2>
                                    Historial de apuestas
                                </h2>

                                <p>
                                    Ganadas contra perdidas
                                </p>
                            </div>

                            <span className="chart-badge">
                                12 apuestas
                            </span>

                        </div>


                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <PieChart>

                                <Pie
                                    data={apuestasData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={75}
                                    outerRadius={110}
                                    paddingAngle={4}
                                >

                                    {apuestasData.map(
                                        (entry, index) => (

                                            <Cell
                                                key={entry.name}
                                                fill={COLORS[index]}
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        background: "#151515",
                                        border:
                                            "1px solid #333",
                                        borderRadius: "8px",
                                        color: "#fff"
                                    }}
                                />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </article>


                    <article className="chart-card">

                        <div className="chart-header">

                            <div>
                                <h2>
                                    Victorias por caracol
                                </h2>

                                <p>
                                    Resultados del día
                                </p>
                            </div>

                            <span className="chart-badge">
                                6 carreras
                            </span>

                        </div>


                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={carrerasData}
                            >

                                <CartesianGrid
                                    stroke="#292929"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="nombre"
                                    stroke="#888"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    allowDecimals={false}
                                    stroke="#888"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    cursor={{
                                        fill:
                                            "rgba(255,255,255,0.03)"
                                    }}
                                    contentStyle={{
                                        background: "#151515",
                                        border:
                                            "1px solid #333",
                                        borderRadius: "8px",
                                        color: "#fff"
                                    }}
                                />

                                <Bar
                                    dataKey="victorias"
                                    name="Victorias"
                                    fill="#e10600"
                                    radius={[6, 6, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </article>

                </section>

            </main>
            <SnailPayModal
                isOpen={isSnailPayOpen}
                onClose={() => setIsSnailPayOpen(false)}
                onBalanceUpdated={(updatedUser) => {
                    setUser(updatedUser);
                }}
            />   

        </div>
        
    );
}

export default Dashboard;